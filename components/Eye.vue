<template>
  <div
    ref="eye"
    class="eye">
    <div
      ref="pupil"
      class="pupil"/>
  </div>
</template>
<script>
export default {
  mounted() {
    document.body.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeDestroy() {
    document.body.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove(event) {
      const center = this.getEyeCenter()
      const eyeRadius = this.getEyeRadius()
      const pupilRadius = this.getPupilRadius()
      const { x, y } = event
      const point = { x, y }

      const newPoint = this.getIsInCircle(center, point, eyeRadius)
        ? point
        : this.getCircumferencePoint(center, point, eyeRadius - pupilRadius)

      this.setPupilPosition(newPoint)
    },
    setPupilPosition({ x, y }) {
      const { style } = this.$refs.pupil
      style.position = 'fixed'
      style.top = y + 'px'
      style.left = x + 'px'
    },
    getCircumferencePoint(center, point, radius) {
      let theta = 0
      const diffX = point.x - center.x
      const diffY = point.y - center.y
      if (diffX !== 0) {
        theta = Math.atan(diffY / diffX)
      }
      let x = radius * Math.cos(theta)
      let y = radius * Math.sin(theta)

      if (point.x < center.x) {
        x *= -1
        y *= -1
      }

      x += center.x
      y += center.y

      return { x, y }
    },
    getPupilRadius() {
      return this.$refs.pupil.getBoundingClientRect().height / 2
    },
    getEyeRadius() {
      return this.$refs.eye.getBoundingClientRect().height / 2
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
  $size: 32px;

  position: relative;
  border: 1px solid black;
  border-radius: 50%;
  height: $size;
  width: $size;
  background: white;

  .pupil {
    $pupil-size: $size / 3;

    position: absolute;
    height: $pupil-size;
    width: $pupil-size;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    background: black;
    margin-left: -$pupil-size / 2;
    margin-top: -$pupil-size / 2;
  }
}
</style>
