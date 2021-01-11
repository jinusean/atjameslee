/* eslint-disable */
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



export const drawLine = (ctx, a, b, color = 'black', width = 10) => {
  ctx.beginPath()
  ctx.strokeStyle = getColor(color, 1.0)
  ctx.lineWidth = width
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()
}

export const drawCircle = (ctx, point, color, stroke = null, radius = 2) => {
  const { x, y } = point
  ctx.strokeStyle = stroke
  ctx.fillStyle = getColor(color, 1.0)

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fill()
}

export const drawCircles = (ctx, points, color, stroke = null, radius = 2) => {
  ctx.strokeStyle = stroke
  ctx.fillStyle = getColor(color, 1.0)

  for (let i = 0; i < points.length; ++i) {
    ctx.beginPath()
    ctx.arc(points[i].x, points[i].y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}


export const drawCrossHair = (ctx, position, rotation = 1) => {
  const { width, height } = ctx.canvas
  const { x, y } = position
  let m = rotation
  let b = y - (m * x)

  // horizontal line
  let start = {
    x: -b / m,
    y: 0,
  }
  let end = {
    x: (height - b) / m,
    y: height,
  }
  drawLine(ctx, start, end)

  // vertical line
  m = -1 / m
  b = y - (m * x)
  start = {
    x: -b / m,
    y: 0,
  }
  end = {
    x: (height - b) / m,
    y: height,
  }
  drawLine(ctx, start, end)
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
    y + height,
  )

  // bottom right curve
  ctx.bezierCurveTo(
    x,
    y + (height + topCurveHeight) / 2,
    x + width / 2,
    y + (height + topCurveHeight) / 2,
    x + width / 2,
    y + topCurveHeight,
  )

  // top right curve
  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}
