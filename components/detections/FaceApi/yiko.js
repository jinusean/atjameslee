import { getRotation, getExtendedPoint, getDistance } from '@/lib/geometry'
import { getRandom } from '@/lib/probability'

export class Yiko {
  constructor(ctx, start, landmarkTarget, image, speed = 10) {
    this.ctx = ctx
    this.position = start
    this.speed = speed
    this.image = image
    this.isCollided = false
    this.isFlipped = false
    this.landmarkTarget = landmarkTarget
  }

  next(landmarks) {
    const target = landmarks[this.landmarkTarget]
    this.position = getExtendedPoint(this.position, target, this.speed)
    this.rotation = getRotation(target, this.position)
    this.isFlipped = this.position.x < target.x
    // check collision
    if (!this.isCollided) {
      this.isCollided = this.checkCollision(target)
    }
  }

  checkCollision(target) {
    return getDistance(target, this.position) < this.speed
  }

  draw() {
    const { width, height } = this.image
    let { x, y } = this.position
    let { rotation } = this
    this.ctx.translate(x, y)

    x = 0
    y = -height / 2

    if (this.isFlipped) {
      this.ctx.scale(-1, 1)
      rotation = -rotation
    }

    this.ctx.rotate(rotation)
    this.ctx.drawImage(this.image, x, y, width, height)
    this.ctx.resetTransform()
  }
}

export class Yikos {
  constructor(ctx, image, maxCount = 10, speed) {
    this.ctx = ctx
    this.speed = speed
    this.list = []
    this.maxCount = maxCount
    this.image = image
    this.onCollision = null
  }

  add(landmarks) {
    const { width, height } = this.ctx.canvas
    const x = getRandom(0, width)
    const y = getRandom(0, height)

    const landmarkTarget = getRandom(0, landmarks.length)
    const yiko = new Yiko(
      this.ctx,
      { x, y },
      landmarkTarget,
      this.image,
      this.speed
    )
    this.list.push(yiko)
  }

  draw(landmarks) {
    const newList = []
    for (const yiko of this.list) {
      if (yiko.isCollided) {
        if (this.onCollision) {
          this.onCollision(this.ctx, yiko)
        }
        continue
      }

      yiko.next(landmarks)
      yiko.draw()
      newList.push(yiko)
    }

    this.list = newList
  }

  randomAdd(landmarks) {
    if (this.list.length >= this.maxCount) {
      return
    }

    if (!getRandom(0, 2)) {
      return
    }

    this.add(landmarks)
  }
}
