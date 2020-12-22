/* eslint-disable */
import { getLandmarks, getCenter } from './utils'
import { inOutSine } from './ease'

const getDistance = (a, b) => {
  const deltaX = a.x - b.x
  const deltaY = a.y - b.y
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

const getPolygonArea = (points) => {
  points = points.concat(points[0])
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]

    total += a.x * b.y + a.y * b.x
  }
  return total * 0.5
}

const getExtendedPoint = (a, b, extension) => {
  const distance = getDistance(a, b)
  return {
    x: b.x + ((b.x - a.x) / distance) * extension,
    y: b.y + ((b.y - a.y) / distance) * extension,
  }
}

export const drawLine = (ctx, a, b, color ='black', width=10) => {
  ctx.beginPath()
  ctx.strokeStyle = getColor(color, 1.0)
  ctx.lineWidth = width
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()
}

const logBase = (n, base) => Math.log(n) / Math.log(base)

export const drawCircle = (ctx, x, y, color, radius) => {
  ctx.strokeStyle = null
  ctx.fillStyle = getColor(color, 1.0)

  const _radius = radius || 2.0

  ctx.beginPath()
  ctx.arc(x, y, _radius, 0, 2 * Math.PI)
  ctx.fill()
}

export const drawCircles = (ctx, array, color, radius) => {
  ctx.strokeStyle = null
  ctx.fillStyle = getColor(color, 1.0)

  const _radius = radius || 2.0

  for (let i = 0; i < array.length; ++i) {
    ctx.beginPath()
    ctx.arc(array[i].x, array[i].y, _radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}

export const getColor = (color, alpha) => {
  const colorStr = color + ''

  if (!colorStr.startsWith('#')) {
    return color
  }

  if (colorStr.startsWith('#')) {
    color = parseInt('0x' + colorStr.substr(1))
  }

  return (
    'rgb(' +
    ((color >> 16) & 0xff).toString(10) +
    ', ' +
    ((color >> 8) & 0xff).toString(10) +
    ', ' +
    (color & 0xff).toString(10) +
    ', ' +
    alpha +
    ')'
  )
}
/**
 * Returns rotation in radians.
 * Positive value means my head is tilted to the left (counter-clockwise)
 * @param a - point a
 * @param b - point b
 * @returns {number} radians
 */
export const getRotation = (a, b) => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.atan(dy / dx)
}

export const getRadians = (degrees) => {
  return degrees * (Math.PI/180)
}

export const getDegrees = (radians) => {
  return radians * (180/Math.PI)
}

export const drawCrossHair = (ctx, position, rotation=1) => {
  const { width, height } = ctx.canvas
  const  { x, y} = position
  let m = rotation
  let b = y - (m * x)

  // horizontal line
  let start = {
    x: -b / m,
    y: 0
  }
  let end = {
    x: (height - b) / m,
    y: height
  }
  drawLine(ctx, start, end)

  // vertical line
  m = -1/m
  b = y - (m * x)
  start = {
    x: -b / m,
    y: 0
  }
  end = {
    x: (height - b) / m,
    y: height
  }
  drawLine(ctx, start, end)
}

export const getCanvasEdgeIntersection = (position, ctx, rotation) => {
  const { height } = ctx.canvas
  const  { x, y} = position
  const m = -1/rotation
  const b = y - (m * x)

  const start = {
    x: -b / m,
    y: 0
  }

  const end = {
    x: (height - b) / m,
    y: height
  }

  return end
}

export const getEatingPositions = (landmarks, ctx, MOUTH_MAX_OPEN=50) => {
  const {
    topLipBot,
    mouthRight,
    mouthLeft,
    botLipTop,
    faceLeft,
    faceRight,
  } = getLandmarks(landmarks)

  const rotation = getRotation(faceLeft, faceRight)
  const finishPos = getCenter(mouthLeft, mouthRight)
  const startPos = getCanvasEdgeIntersection(finishPos, ctx, rotation)
  const maxDistance = getDistance(finishPos, startPos)
  let mouthOpenDistance = Math.min(
    getDistance(botLipTop, topLipBot),
    MOUTH_MAX_OPEN
  )

  const MIN = 10
  if (mouthOpenDistance < MIN) {
    mouthOpenDistance = 0
  } else {
    mouthOpenDistance -= MIN
    MOUTH_MAX_OPEN -= MIN
  }



  const mouthOpenPercent = (mouthOpenDistance / MOUTH_MAX_OPEN)


  console.log(mouthOpenPercent)

  const val = 1 - inOutSine(mouthOpenPercent)
  const distFromMouth = maxDistance * val

  const currentPos = {
    x: distFromMouth * Math.sin(-rotation) + finishPos.x,
    y: -distFromMouth * Math.cos(rotation) + finishPos.y
  }

  return {
    startPos,
    finishPos,
    currentPos,
    rotation,
    maxDistance,
    mouthOpenDistance,
    mouthOpenPercent,
    distFromMouth
  }
}

let total = 'Food Distance, Mouth Open\n'

export const drawPepper = (
  ctx,
  landmarks,
  color,
  width = 25,
  height = 100,
  tip = 0.3,
) => {
  const {
    finishPos,
    rotation,
    distFromMouth,
  } = getEatingPositions(landmarks, ctx)

  const BALL_RADIUS = width / 2
  const TIP_HEIGHT = height * tip
  const SHAFT_HEIGHT = height - TIP_HEIGHT - BALL_RADIUS

  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.translate(finishPos.x, finishPos.y)
  ctx.rotate(rotation)
  ctx.ellipse(
    0,
    TIP_HEIGHT + distFromMouth,
    BALL_RADIUS,
    TIP_HEIGHT,
    0,
    0,
    Math.PI,
    true
  )
  ctx.fill()
  ctx.fillRect(-BALL_RADIUS, TIP_HEIGHT + distFromMouth, width, SHAFT_HEIGHT) // bottom right shaft

  ctx.beginPath()
  ctx.arc(
    -BALL_RADIUS,
    TIP_HEIGHT + distFromMouth + SHAFT_HEIGHT,
    BALL_RADIUS,
    0,
    2 * Math.PI
  )
  ctx.fill()
  ctx.beginPath()
  ctx.arc(
    BALL_RADIUS,
    TIP_HEIGHT + distFromMouth + SHAFT_HEIGHT,
    BALL_RADIUS,
    0,
    2 * Math.PI
  )
  ctx.fill()
  ctx.resetTransform()
}

export const drawHeart = (ctx, x, y, width, height, color = 'red') => {
  ctx.save()
  ctx.beginPath()
  const topCurveHeight = height * 0.3
  ctx.moveTo(x, y + topCurveHeight)
  // top left curve
  ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight)

  // bottom left curve
  ctx.bezierCurveTo(
    x - width / 2,
    y + (height + topCurveHeight) / 2,
    x,
    y + (height + topCurveHeight) / 2,
    x,
    y + height
  )

  // bottom right curve
  ctx.bezierCurveTo(
    x,
    y + (height + topCurveHeight) / 2,
    x + width / 2,
    y + (height + topCurveHeight) / 2,
    x + width / 2,
    y + topCurveHeight
  )

  // top right curve
  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}
