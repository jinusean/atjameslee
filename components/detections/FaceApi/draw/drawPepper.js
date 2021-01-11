import {
  getCenter,
  getDistance,
  getLandmarks,
  getRotation,
} from '@/lib/geometry'
import * as ease from '@/components/detections/FaceApi/ease'

export const getEatingPositions = (landmarks, ctx, MOUTH_MAX_OPEN = 50) => {
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

  const mouthOpenPercent = mouthOpenDistance / MOUTH_MAX_OPEN
  const val = 1 - ease.inOutSine(mouthOpenPercent)
  const distFromMouth = maxDistance * val
  const currentPos = {
    x: distFromMouth * Math.sin(-rotation) + finishPos.x,
    y: -distFromMouth * Math.cos(rotation) + finishPos.y,
  }

  return {
    startPos,
    finishPos,
    currentPos,
    rotation,
    maxDistance,
    mouthOpenDistance,
    mouthOpenPercent,
    distFromMouth,
  }
}

export const getCanvasEdgeIntersection = (position, ctx, rotation) => {
  const { height } = ctx.canvas
  const { x, y } = position
  const m = -1 / rotation
  const b = y - m * x

  // const start = {
  //   x: -b / m,
  //   y: 0,
  // }

  const end = {
    x: (height - b) / m,
    y: height,
  }

  return end
}

export const drawPepper = (
  ctx,
  landmarks,
  color,
  width = 25,
  height = 100,
  tip = 0.3
) => {
  const { finishPos, rotation, distFromMouth } = getEatingPositions(
    landmarks,
    ctx
  )

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

export default drawPepper
