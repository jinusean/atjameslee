/// ////////////////////////////////////////////////////////////////////////   Start
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

const getCenter = (a, b) => {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  }
}

const getSlope = (a, b) => {
  return (b.y - a.y) / (b.x - a.x)
}

const getExtendedPoint = (a, b, extension) => {
  const distance = getDistance(a, b)
  return {
    x: b.x + ((b.x - a.x) / distance) * extension,
    y: b.y + ((b.y - a.y) / distance) * extension,
  }
}

export const drawLine = (ctx, a, b, color, width) => {
  ctx.beginPath()
  ctx.strokeStyle = getColor(color, 1.0)
  ctx.lineWidth = width
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()
}

const logBase = (n, base) => Math.log(n) / Math.log(base)

const lineIntersection = (pointA, pointB, pointC, pointD) => {
  const z1 = pointA.x - pointB.x
  const z2 = pointC.x - pointD.x
  const z3 = pointA.y - pointB.y
  const z4 = pointC.y - pointD.y
  const dist = z1 * z4 - z3 * z2
  if (dist === 0) {
    return null
  }
  const tempA = pointA.x * pointB.y - pointA.y * pointB.x
  const tempB = pointC.x * pointD.y - pointC.y * pointD.x
  const xCoor = (tempA * z2 - z1 * tempB) / dist
  const yCoor = (tempA * z4 - z3 * tempB) / dist

  // if (xCoor < Math.min(pointA.x, pointB.x) || xCoor > Math.max(pointA.x, pointB.x) ||
  //     xCoor < Math.min(pointC.x, pointD.x) || xCoor > Math.max(pointC.x, pointD.x)) {
  //     return null
  // }
  // if (yCoor < Math.min(pointA.y, pointB.y) || yCoor > Math.max(pointA.y, pointB.y) ||
  //     yCoor < Math.min(pointC.y, pointD.y) || yCoor > Math.max(pointC.y, pointD.y)) {
  //     return null
  // }

  return {
    x: xCoor,
    y: yCoor,
  }
}

const getLinePoint = (pointA, pointB, distance) => {
  // Find Slope of the line
  const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x)

  const theta = Math.atan(slope)

  const x = pointB.x + distance * Math.cos(theta)
  const y = pointB.y + distance * Math.sin(theta)

  return { x, y }
}

export const draw = (
  ctx,
  landmarks,
  rotation,
  color,
  width = 25,
  height = 100,
  tip = 0.3
) => {
  const noseBot = landmarks[51]
  const topLipBot = landmarks[62]
  const topLipTop = landmarks[51]
  const mouthLeft = landmarks[60]
  const mouthRight = landmarks[64]
  const chin = landmarks[8]
  const botLipBot = landmarks[57]
  const botLipTop = landmarks[66]
  const area = getPolygonArea(landmarks.slice(60, 68))
  const center = getCenter(mouthLeft, mouthRight)
  const slope = getSlope(center, topLipBot)

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

  const startX = finishPos.x
  const startY = finishPos.y

  const BALL_RADIUS = width / 2
  const TIP_HEIGHT = height * tip
  const SHAFT_HEIGHT = height - TIP_HEIGHT - BALL_RADIUS

  // const wrapped = new ContextWrap(ctx)
  // wrapped.wrap()
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.translate(finishPos.x, finishPos.y)
  ctx.rotate((rotation * Math.PI) / 180)
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
    ((color >> 16) & 0xFF).toString(10) +
    ', ' +
    ((color >> 8) & 0xFF).toString(10) +
    ', ' +
    (color & 0xFF).toString(10) +
    ', ' +
    alpha +
    ')'
  )
}

export const drawRect = (ctx, rect, color, lineWidth) => {
  ctx.strokeStyle = getColor(color, 1.0)
  ctx.fillStyle = null

  ctx.lineWidth = lineWidth || 1.0

  ctx.beginPath()
  ctx.rect(rect.x, rect.y, rect.width, rect.height)
  ctx.stroke()
}

export const drawRects = (ctx, rects, color, lineWidth) => {
  ctx.strokeStyle = getColor(color, 1.0)
  ctx.fillStyle = null

  ctx.lineWidth = lineWidth || 1.0

  for (let i = 0; i < rects.length; ++i) {
    const rect = rects[i]

    ctx.beginPath()
    ctx.rect(rect.x, rect.y, rect.width, rect.height)
    ctx.stroke()
  }
}
