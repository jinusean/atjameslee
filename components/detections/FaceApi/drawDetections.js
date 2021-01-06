export const OPTIONS = Object.freeze([
  'gender',
  'age',
  'landmarks',
  'boundingBox',
  'expression',
  'multiple',
])

const draw = (faceapi, canvas, mediaElement, detections, options) => {
  const text = []
  if (options.boundingBox) {
    faceapi.draw.drawDetections(canvas, detections)
  }
  if (options.landmarks) {
    faceapi.draw.drawFaceLandmarks(canvas, detections)
  }
  if (options.age) {
    text.push(`Age: ${Math.round(detections.age)}`)
  }
  if (options.gender) {
    text.push(
      `Gender: ${detections.gender} (${
        parseInt(detections.genderProbability * 100) / 100
      })`
    )
  }
  if (options.expression) {
    const [expression] = detections.expressions.asSortedArray()
    text.push(
      `Expression: ${expression.expression} (${
        parseInt(expression.probability * 100) / 100
      })`
    )
  }
  if (text.length) {
    const anchor = detections.alignedRect.box.bottomLeft
    const drawBox = new faceapi.draw.DrawTextField(text, anchor)
    drawBox.draw(canvas)
  }
}

const getDetections = async (faceapi, mediaElement, options) => {
  let detectPromise =
    faceapi[options.multiple ? 'detectAllFaces' : 'detectSingleFace']
  detectPromise = detectPromise(
    mediaElement,
    new faceapi.TinyFaceDetectorOptions()
  )

  if (options.landmarks) {
    detectPromise = detectPromise.withFaceLandmarks()
  }

  if (options.age || options.gender) {
    detectPromise = detectPromise.withAgeAndGender()
  }

  if (options.expression) {
    detectPromise = detectPromise.withFaceExpressions()
  }

  return await detectPromise
}

export const drawDetections = async (
  faceapi,
  canvas,
  mediaElement,
  options = {}
) => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const { width, height } = mediaElement
  canvas.width = width
  canvas.height = height

  const detections = await getDetections(faceapi, mediaElement, options)
  if (!detections) {
    return false
  }

  const displaySize = { width, height }
  const resizedDetections = faceapi.resizeResults(detections, displaySize)

  for (const resizedDetection of resizedDetections) {
    draw(faceapi, canvas, mediaElement, resizedDetection, options)
  }

  return true
}
export default drawDetections
