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

/**
 * Returns rotation in radians.
 * Positive value means my head is tilted to the left (counter-clockwise)
 * @param a - point a
 * @param b - point b
 * @param radians - return radians or degrees
 * @returns {number} radians
 */
export const getRotation = (a, b, radians = true) => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const rotation = Math.atan(dy / dx)
  return radians ? rotation : getDegrees(radians)
}

export const getRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

export const getDegrees = (radians) => {
  return radians * (180 / Math.PI)
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

export const getDistance = (a, b) => {
  const deltaX = a.x - b.x
  const deltaY = a.y - b.y
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

export const getPolygonArea = (points) => {
  points = points.concat(points[0])
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]

    total += a.x * b.y + a.y * b.x
  }
  return total * 0.5
}

export const getExtendedPoint = (pointA, pointB, distanceFromA) => {
  const length = getDistance(pointA, pointB)
  const t = distanceFromA / length

  const x = (1 - t) * pointA.x + t * pointB.x
  const y = (1 - t) * pointA.y + t * pointB.y

  return { x, y }
}

export const getCenter = (a, b) => {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  }
}

export const getSlope = (a, b) => {
  return (b.y - a.y) / (b.x - a.x)
}

export const getLandmarks = (landmarks) => {
  const noseBot = landmarks[51]
  const topLipBot = landmarks[62]
  const topLipTop = landmarks[51]
  const mouthLeft = landmarks[60]
  const mouthRight = landmarks[64]
  const chin = landmarks[8]
  const botLipBot = landmarks[57]
  const botLipTop = landmarks[66]
  const center = getCenter(mouthLeft, mouthRight)

  const faceLeft = landmarks[0]
  const faceRight = landmarks[16]

  return {
    eyesMid: landmarks[27],
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
  }
}

export const getRandom = (min, max, integer = true) => {
  let val = Math.random() * (max - min) + min
  if (integer) {
    val = Math.round(val)
  }
  return val
}
