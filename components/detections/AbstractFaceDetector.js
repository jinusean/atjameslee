class AbstractFaceDetector {
  static isLoaded = false
  _mirror = false
  _drawingBoard = null

  constructor(...args) {
    for (const arg of args) {
      if (arg instanceof HTMLImageElement) {
        this._element = arg
      } else if (arg instanceof HTMLVideoElement) {
        this._element = arg
      } else if (arg instanceof HTMLCanvasElement) {
        this._canvas = arg
      } else if (arg.constructor && arg.constructor.name === 'Object') {
        this._options = arg
      } else {
        throw new Error('Unknown argument: ' + args)
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

  detect() {
    throw new Error('detect() is not implemented')
  }

  drawDetections() {
    throw new Error('drawDetections() is not implemented')
  }

  async detectAndDraw() {
    const { element, canvas, options, drawingBoard } = this
    const detections = await this.detect(element, options)
    this.drawImage(drawingBoard, canvas)
    if (detections) {
      this.drawDetections(detections, canvas, options)
    }
    return detections
  }
}

export default AbstractFaceDetector
