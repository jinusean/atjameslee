<template>
  <div 
    ref="eye"
    class="eye"><div ref="pupil"/>
  </div>
</template>
<script>
const watchedEvents = ['mousemove', 'touchmove']
export default {
  mounted() {
    watchedEvents.forEach(event =>
      document.body.addEventListener(event, this.handleMove)
    )
  },
  beforeDestroy() {
    watchedEvents.forEach(event =>
      document.body.removeEventListener(event, this.handleMove)
    )
  },
  methods: {
    handleMove(event) {
      const center = this.getEyeCenter()
      const radius = this.getRadius()
      const { x, y } = event
      const point = { x, y }

      const newPoint = this.getIsInEllipsis(center, point, radius)
        ? point
        : this.getCircumferencePoint(center, point, radius)

      this.setPupilPosition(newPoint)
    },
    setPupilPosition({ x, y }) {
      const { style } = this.$refs.pupil
      const { top, left } = this.$refs.eye.getBoundingClientRect()
      style.top = y - top + 'px'
      style.left = x - left + 'px'
    },
    getCircumferencePoint(center, point, radius) {
      let theta = 0
      const diffX = point.x - center.x
      const diffY = point.y - center.y
      if (diffX !== 0) {
        theta = Math.atan(diffY / diffX)
      }
      let x = radius.x * Math.cos(theta)
      let y = radius.y * Math.sin(theta)

      if (point.x <= center.x) {
        x *= -1
        y *= -1
      }

      x += center.x
      y += center.y

      return { x, y }
    },
    getRadius() {
      const eyeRadius = this.getEyeRadius()
      const pupilRadius = this.getPupilRadius()
      return {
        x: eyeRadius.x - pupilRadius.x,
        y: eyeRadius.y - pupilRadius.y
      }
    },
    getPupilRadius() {
      const { width, height } = this.$refs.pupil.getBoundingClientRect()
      return {
        x: width / 2,
        y: height / 2
      }
    },
    getEyeRadius() {
      const { width, height } = this.$refs.eye.getBoundingClientRect()
      return {
        x: width / 2,
        y: height / 2
      }
    },
    getEyeCenter() {
      const {
        top,
        left,
        height,
        width
      } = this.$refs.eye.getBoundingClientRect()

      return {
        x: left + width / 2,
        y: top + height / 2
      }
    },
    getIsInCircle(center, point, radius) {
      return radius >= this.getDistance(center, point)
    },
    getIsInEllipsis(center, point, radius) {
      const xSide = Math.pow(center.x - point.x, 2) / Math.pow(radius.x, 2)
      const ySide = Math.pow(center.y - point.y, 2) / Math.pow(radius.y, 2)
      return xSide + ySide <= 1
    },
    getDistance(point1, point2) {
      const { x: x1, y: y1 } = point1
      const { x, y } = point2

      const xDiff = Math.pow(x - x1, 2)
      const yDiff = Math.pow(y - y1, 2)
      return Math.sqrt(xDiff + yDiff)
    }
  }
}
</script>
<style lang="scss">
.eye {
  $size: 30px;
  position: relative;
  height: $size;
  width: $size * 0.8;
  background: white;
  border: 1px solid black;
  border-radius: 50%;

  .pupil {
    $pupil-size: 33%;

    position: absolute;
    top: 50%;
    left: 50%;
    width: $pupil-size;
    height: $pupil-size;
    margin-top: -$pupil-size / 2;
    margin-left: -$pupil-size / 2;
    background: black;
    border-radius: 50%;
  }
}
</style>
