/* eslint-disable */
import { getLandmarks, getCenter } from './utils'

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

const drawLine = (ctx, a, b, color, width) => {
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

  if (colorStr.startsWith('rgb')) {
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
 * Returns rotation in radians
 * @param a - point a
 * @param b - point b
 * @returns {number} radians
 */
export const getRotation = (a, b) => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.atan(dy / dx)
}

export const draw = (
  ctx,
  landmarks,
  color,
  width = 25,
  height = 100,
  tip = 0.3
) => {
  const {
    noseBot,
    topLipBot,
    topLipTop,
    mouthRight,
    mouthLeft,
    chin,
    botLipTop,
    botLipBot,
    center,
    faceLeft,
    faceRight,
  } = getLandmarks(landmarks)

  const rotation = getRotation(faceLeft, faceRight)

  // image is mirrored os left = right and vice-versa
  const finishPos = getCenter(mouthLeft, mouthRight)
  const MOUTH_MAX_OPEN = 50
  const MAX_DISTANCE = getDistance(finishPos, {
    x: ctx.canvas.width,
    y: ctx.canvas.height,
  })
  const mouthOpenDistance = Math.min(
    getDistance(botLipTop, topLipBot),
    MOUTH_MAX_OPEN
  )
  const distanceFromMouthFactor = 1 - logBase(mouthOpenDistance, MOUTH_MAX_OPEN)
  const distFromMouth = Math.max(0, MAX_DISTANCE * distanceFromMouthFactor)

  const BALL_RADIUS = width / 2
  const TIP_HEIGHT = height * tip
  const SHAFT_HEIGHT = height - TIP_HEIGHT - BALL_RADIUS

  // const wrapped = new ContextWrap(ctx)
  // wrapped.wrap()
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
