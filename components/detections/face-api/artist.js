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
const drawDicks = (ctx, array, color, width = 25, height = 50) => {
  // 50 is about the max distance from mouth opening
  const MOUTH_MAX_OPEN = 50

  // get area of opened mouth
  const noseBot = array[51]
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

  const maxDistance = getDistance(topLipBot, intersection)

  const MIN_DISTANCE = ballRadius + 10

  const mouthOpenDistance = Math.min(
    getDistance(botLipTop, topLipBot),
    MOUTH_MAX_OPEN
  )
  const distanceFromMouthFactor =
    1 - logBase(mouthOpenDistance + 1, MOUTH_MAX_OPEN)
  const distanceFromMouth = Math.max(
    MIN_DISTANCE,
    maxDistance * distanceFromMouthFactor - ballRadius
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

export function draw(canvas, resizeResults) {
  const ctx = canvas.getContext('2d')
  const wrapped = new ContextWrap(ctx)
  wrapped.wrap()

  const landmarks = resizeResults.landmarks.positions
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

  const SHAFT_WIDTH = 15
  const SHAFT_HEIGHT = 50
  const BALL_RADIUS = 15

  // image is mirrored os left = right and vice-versa
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  // ctx.moveTo(chin.x + SHAFT_WIDTH, chin.y) // right of tip
  // ctx.quadraticCurveTo(chin.x, chin.y - 100, chin.x - SHAFT_WIDTH, chin.y) // left of tip
  // ctx.lineTo(chin.x - SHAFT_WIDTH, chin.y + SHAFT_HEIGHT) // bot shaft

  ctx.moveTo(chin.x + SHAFT_WIDTH, chin.y) // right of tip
  ctx.quadraticCurveTo(chin.x, chin.y - 100, -2 * SHAFT_WIDTH, 0) // left of tip
  // ctx.lineTo(wrapped.x - SHAFT_WIDTH, wrapped.x + SHAFT_HEIGHT) // bot shaft

  // start ball
  // ctx.moveTo(chin.x - SHAFT_WIDTH)
  ctx.fill()

  wrapped.unwrap()
}

class ContextWrap {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 0
    this.y = 0

    this.wrapped = {}
  }

  wrap() {
    for (const prop in this.ctx) {
      const attribute = this.ctx[prop]
      if (typeof attribute === 'function') {
        this.wrapped[prop] = attribute
        this.ctx[prop] = (...args) => {
          switch (prop) {
            case 'beginPath':
              this.y = 0
              this.x = 0
              break
            default:
              if (args.length < 2) {
                break
              }
              this.y += args[args.length - 1]
              this.x += args[args.length - 2]
              args[args.length - 1] = this.y
              args[args.length - 2] = this.x
          }
          return attribute.apply(this.ctx, args)
        }
      }
    }
  }

  unwrap() {
    for (const prop in this.wrapped) {
      this.ctx[prop] = this.wrapped[prop]
    }
    this.wrapped = {}
  }
}

function wrapCtx(ctx) {
  let x = 0
  let y = 0

  for (const prop in ctx) {
    const attribute = ctx[prop]
    if (typeof attribute === 'function') {
      ctx[prop] = (...args) => {
        if (args.length > 1) {
          y += args[args.length - 1]
          x += args[args.length - 2]
          args[args.length - 1] = y
          args[args.length - 2] = x
        } else if (prop === 'beginPath') {
          x = 0
          y = 0
        }
        console.log(prop, ...args)
        return attribute.apply(ctx, args)
      }
    }
  }

  return ctx
}
