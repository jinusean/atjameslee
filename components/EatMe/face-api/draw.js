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

const drawLine = (ctx, a, b, color, width) => {
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
export const drawDicks = (ctx, array, color, width = 25, height = 50) => {
  // 50 is about the max distance from mouth opening
  const MOUTH_MAX_OPEN = 50
  // get area of opened mouth
  const noseBot = array[51]
  console.log(noseBot)
  const topLipBot = array[62]
  const topLipTop = array[51]
  const left = array[60]
  const chin = array[8]
  const right = array[64]
  const botLipBot = array[57]
  const botLipTop = array[66]
  const area = getPolygonArea(array.slice(60, 68))
  // const width = getDistance(left, right)
  const center = getCenter(left, right)
  const slope = getSlope(center, topLipBot)

  const ballRadius = width / 2

  const x = ctx.canvas.width
  const y = ctx.canvas.height
  const canvasLeftCorner = { x: 0, y }
  const canvasRightCorner = { x, y }
  const intersection = lineIntersection(
    topLipBot,
    chin,
    canvasLeftCorner,
    canvasRightCorner
  )

  const MIN_DISTANCE = ballRadius + 10
  const maxDistance = y + MIN_DISTANCE - topLipBot.y

  let mouthOpenDistance = Math.min(
    getDistance(botLipTop, topLipBot),
    MOUTH_MAX_OPEN
  )
  mouthOpenDistance = mouthOpenDistance - MOUTH_MAX_OPEN / 2
  // const distanceFromMouthFactor = 1 - mouthOpenDistance / (MOUTH_MAX_OPEN / 2)
  const distanceFromMouthFactor =
    1 - logBase(mouthOpenDistance + 1, MOUTH_MAX_OPEN / 2)

  const distanceFromMouth = Math.max(
    MIN_DISTANCE,
    maxDistance * distanceFromMouthFactor
  ) // where the tip position is
  const shaftTop = getExtendedPoint(noseBot, topLipBot, distanceFromMouth)
  const shaftBot = getExtendedPoint(noseBot, shaftTop, height)

  let px = topLipBot.y - shaftBot.y
  let py = topLipBot.x - shaftBot.x
  const len = ballRadius / Math.hypot(px, py)
  px = px * len
  py = -(py * len)
  const leftBall = {
    x: shaftBot.x + px,
    y: shaftBot.y + py,
  }
  const rightBall = {
    x: shaftBot.x - px,
    y: shaftBot.y - py,
  }
  drawLine(ctx, shaftTop, shaftBot, color, width)
  drawCircles(ctx, [shaftTop, rightBall, leftBall], color, ballRadius)
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
