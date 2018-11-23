<template>
  <div
    class="warp"
    @mousemove="handleMousemove">
    <!--<div-->
    <!--ref="eye"-->
    <!--class="eye">-->
    <!--<div-->
    <!--ref="pupil"-->
    <!--class="pupil"/>-->
    <!--</div>-->

    <div class="joe"/>
  </div>
</template>
<script>
export default {
  data() {
    const max = 100
    const counts = []
    for (let i = 0; i < max; i++) {
      counts.push(i)
    }

    return {
      counts
    }
  },

  methods: {
    handleMousemove({ x, y }) {
      console.log(this.$refs)
      this.counts.forEach(num => {
        setTimeout(() => {
          const color = this.getRandomColor()
          const style = this.$refs[`dick${num}`][0].style
          style.top = y + 'px'
          style.left = x + 'px'
          this.$refs[`ball1-${num}`][0].style.background = color
          this.$refs[`ball2-${num}`][0].style.background = color
          this.$refs[`shaft${num}`][0].style.background = color
        }, 100 * num)
      })

      // const { top, left } = this.getEyeCenter()
      // const radius = this.getEyeRadius()
      // const slope = this.getSlope(x, y, left, top)
      // console.log(slope)
      // const pupil = this.$refs.pupil.style
      // // pupil.top = this.getNewY(top, slope, radius) + 'px'
      // // pupil.left = this.getNewX(left, slope, radius) + 'px'
      // pupil.top = y + 'px'
      // pupil.left = x + 'px'
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
        top: top + height / 2,
        left: left + width / 2
      }
    },
    getSlope(x1, y1, x2, y2) {
      return (y1 - y2) / (x1 - x2)
    },
    getNewX(x, m, d) {
      let result = 1 + Math.pow(m, 2)
      result = Math.sqrt(result)
      result = d / result
      return result + x
    },
    getNewY(y, m, d) {
      let result = 1 + Math.pow(m, 2)
      result = Math.sqrt(result)
      result = (d * m) / result
      return result + y
    }
  }
}
</script>
<style lang="scss">
html,
body {
  cursor: none;
}

.warp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .eye {
    position: relative;
    border: 1px solid black;
    border-radius: 50%;
    height: 25vh;
    width: 25vh;

    .pupil {
      position: fixed;
      height: 16px;
      width: 16px;
      background: black;
      margin-left: -8px;
      margin-top: -8px;
    }
  }
}
</style>
