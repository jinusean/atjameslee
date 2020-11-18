export const getDistance = (a, b) => {
  const deltaX = a.x - b.x
  const deltaY = a.y - b.y
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

export const getDistantPoint = (pointA, pointB, distanceFromA) => {
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
