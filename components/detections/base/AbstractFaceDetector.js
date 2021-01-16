class AbstractFaceDetector {
  static isLoaded = false

  constructor(...args) {
    for (const arg of args) {
      if (arg instanceof HTMLImageElement) {
        this._element = arg
      } else if (arg instanceof HTMLVideoElement) {
        this._element = arg
      } else if (arg instanceof HTMLCanvasElement) {
        this._canvas = arg
      } else if (arg && arg.constructor && arg.constructor.name === 'Object') {
        this._options = arg
      } else {
        throw new Error('Unknown argument: ' + JSON.stringify(args))
      }
    }

    this._drawingBoard = document.createElement('canvas')
  }

  get mirror() {
    return this._mirror
  }

  set mirror(mirror) {
    this._mirror = mirror
    this.setDimensions()
    this.checkMirrored()
  }

  get drawingBoard() {
    return this._drawingBoard
  }

  get canvas() {
    return this._canvas
  }

  get options() {
    return this._options
  }

  get element() {
    return this._element
  }

  set detections(detections) {
    this._detections = detections || []
  }

  get detections() {
    return this._detections
  }

  setDimensions() {
    const { element, canvas, drawingBoard } = this

    if (canvas.width !== element.width || canvas.height !== element.height) {
      canvas.height = element.height
      canvas.width = element.width
    }
    if (
      drawingBoard.width !== element.width ||
      drawingBoard.height !== element.height
    ) {
      drawingBoard.width = element.width
      drawingBoard.height = element.height
    }
  }

  checkMirrored() {
    const ctx = this.drawingBoard.getContext('2d')
    let translate = 0
    let scale = 1
    if (this.mirror) {
      translate = this.drawingBoard.width
      scale = -1
    }
    ctx.translate(translate, 0)
    ctx.scale(scale, 1)
  }

  drawImage(from, to) {
    to.getContext('2d').drawImage(from, 0, 0, from.width, from.height)
  }

  async update() {
    this.setDimensions()
    const { element, drawingBoard } = this
    this.drawImage(element, drawingBoard)
    this.detections = await this.detect()
  }

  drawDetections() {
    const { canvas, drawingBoard } = this
    this.drawImage(drawingBoard, canvas)
    return this.draw()
  }

  drawBox(x, y, width, height, lineWidth = 2, color = 'blue') {
    const ctx = this.canvas.getContext('2d')
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.stroke()
  }

  detect() {
    throw new Error('detect() is not implemented')
  }

  draw(detections = this.detections) {
    throw new Error('draw() is not implemented')
  }

  async detectAndDraw() {
    await this.update()
    await this.drawDetections()
    return this.detections
  }
}

export default AbstractFaceDetector
