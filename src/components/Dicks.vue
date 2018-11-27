<template>
  <div class="dicks">
    <div
      v-for="i in counts"
      v-show="isMounted"
      :ref="`dick-${i}`"
      :key="i"
      class="dick-wrapper">
      <div class="dick">
        <div class="balls">
          <div
            :ref="`ball1-${i}`"
            class="ball ball-1"/>
          <div
            :ref="`ball2-${i}`"
            class="ball ball-2"/>
        </div>
        <div
          :ref="`shaft-${i}`"
          class="shaft"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dicks',
  props: {
    count: {
      type: Number,
      default: 100
    },
    interval: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  computed: {
    counts() {
      const counts = []

      for (let i = 0; i < this.count; i++) {
        counts.push(i)
      }
      return counts
    }
  },
  mounted() {
    this.makeDicks()
    setInterval(this.makeDicks, this.interval * (this.counts.length + 1))
    this.isMounted = true
  },
  methods: {
    makeDicks() {
      const { height, width } = this.$el.getBoundingClientRect()
      this.counts.forEach(i => {
        setTimeout(() => {
          const color = this.getRandomColor()
          const style = this.$refs[`dick-${i}`][0].style
          style.top = this.getRandomNumber(height) + 'px'
          style.left = this.getRandomNumber(width) + 'px'
          this.$refs[`ball1-${i}`][0].style.background = color
          this.$refs[`ball2-${i}`][0].style.background = color
          this.$refs[`shaft-${i}`][0].style.background = color
          this.$refs[
            `dick-${i}`
          ][0].style.transform = `rotate(${this.getRandomNumber(360)}deg)`
        }, this.interval * i)
      })
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'

      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[this.getRandomNumber(letters.length)]
      }
      return color
    },
    getRandomNumber(max) {
      return Math.floor(Math.random() * max)
    }
  }
}
</script>
<style lang="scss">
.dicks {
  width: 100%;
  height: 100%;
  $size: 36px;

  .dick-wrapper {
    position: absolute;
  }

  .dick {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: -20px;
    margin-left: -112px;
    transition: all 100ms;

    .balls {
      .ball {
        width: $size;
        height: $size;
        background: black;
        border-radius: 100%;
      }
    }
    .shaft {
      width: $size * 5;
      height: $size / 1.4;
      margin-left: -$size / 2;
      background: black;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }
}
</style>
