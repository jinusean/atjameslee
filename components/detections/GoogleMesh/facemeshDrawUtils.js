import TRIANGULATION from '@/components/detections/GoogleMesh/TRIANGULATION.json'
const NUM_KEYPOINTS = 468
const NUM_IRIS_KEYPOINTS = 5
const GREEN = '#32EEDB'
const RED = '#FF2C35'

export const drawMesh = (ctx, points, color = GREEN) => {
  ctx.fillStyle = color
  for (let i = 0; i < NUM_KEYPOINTS; i++) {
    const x = points[i][0]
    const y = points[i][1]

    ctx.beginPath()
    ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI)
    ctx.fill()
  }
}

export const drawIris = (ctx, points, lineWidth = 1, color = RED) => {
  if (points.length < NUM_KEYPOINTS) {
    return
  }
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  const leftCenter = points[NUM_KEYPOINTS]
  const leftDiameterY = distance(
    points[NUM_KEYPOINTS + 4],
    points[NUM_KEYPOINTS + 2]
  )
  const leftDiameterX = distance(
    points[NUM_KEYPOINTS + 3],
    points[NUM_KEYPOINTS + 1]
  )

  ctx.beginPath()
  ctx.ellipse(
    leftCenter[0],
    leftCenter[1],
    leftDiameterX / 2,
    leftDiameterY / 2,
    0,
    0,
    2 * Math.PI
  )
  ctx.stroke()

  // draw right eye
  if (points.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
    const rightCenter = points[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS]
    const rightDiameterY = distance(
      points[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
      points[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
    )
    const rightDiameterX = distance(
      points[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
      points[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
    )

    ctx.beginPath()
    ctx.ellipse(
      rightCenter[0],
      rightCenter[1],
      rightDiameterX / 2,
      rightDiameterY / 2,
      0,
      0,
      2 * Math.PI
    )
    ctx.stroke()
  }
}

export const drawTriangulations = (
  ctx,
  points,
  lineWidth = 0.5,
  color = GREEN
) => {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const triPoints = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => points[index])

    drawPath(ctx, triPoints, true)
  }
}

export const drawPath = (ctx, points, closePath) => {
  const region = new Path2D()
  region.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    region.lineTo(point[0], point[1])
  }

  if (closePath) {
    region.closePath()
  }
  ctx.stroke(region)
}

export const distance = (a, b) => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}
