<template>
  <div
    class="relative w-full h-full flex flex-col items-center justify-center"
    :class="skyClass"
    v-bind="$attrs"
  >
    <div class="inline-block">
      <p class="inline-block text-black text-8xl z-30">James</p>
      <br />
      <p class="inline-block text-black text-8xl z-10">Lee</p>
    </div>
    <button class="bg-black w-20 h-6" @click="addCloud">Click ME</button>
    <button class="w-20 h-18 bg-red-400" @click="hour++">chnage color</button>
    <div>
      {{ hour }}
    </div>

    <transition-group name="float-cloud" tag="div">
      <div
        v-for="cloud in clouds"
        :id="cloud.id"
        :key="cloud.id"
        :style="cloud.style"
        :width="cloud.width"
        class="absolute"
        @click="clicked"
        @animationend="onAnimationEnd"
      />
    </transition-group>
  </div>
</template>

<script>
import { getRandom } from '@/lib/probability'
// import Cloud from './Cloud'

export default {
  name: 'CloudedSky',
  components: {},
  props: {
    sky: {
      type: Boolean,
      default: true,
    },
    timerDelay: {
      type: Number,
      default: 30 * 60 * 1000, // 30 minutes
    },
  },
  data() {
    return {
      clouds: [],
      hour: new Date().getHours(),
    }
  },
  computed: {
    skyClass() {
      return 'sky-gradient-' + this.hour
    },
  },
  mounted() {
    this.startTimer()
    // this.addRandomClouds()
  },
  destroyed() {
    this.startTimer()
  },
  methods: {
    stopTimer() {
      clearInterval(this._intervalId)
      this._intervalId = null
    },
    startTimer() {
      this.stopTimer()
      this._intervalId = setInterval(() => {
        this.hour = new Date().getHours()
      }, this.timerDelay)
    },
    addRandomClouds() {
      Array(getRandom(1, 4))
        .fill()
        .forEach(() => {
          const cloud = this.addCloud()
          cloud.style.left = getRandom(100, window.innerWidth) + 'px'
        })
    },
    addCloud() {
      const width = getRandom(30, 300)
      const cloud = {
        id: 'cloud_' + new Date().getTime(),
        style: {
          // top: getRandom(-150, 500) + 'px',
          // left: -width + 'px',
          top: 0,
          left: 0,
          'z-index': getRandom(0, 4) * 10,

          width: '200px',
          height: '200px',
          background: 'red',
        },
        width,
      }
      this.clouds.push(cloud)
      return cloud
    },
    onAnimationEnd(event) {
      const { id } = event.target
      for (let i = 0; i < this.clouds.length; i++) {
        if (this.clouds[i].id === id) {
          return this.clouds.splice(i, 1)
        }
      }
      throw new Error('Could not remove cloud:', event)
    },
  },
}
</script>

<style scoped src="./sky-gradients.css" />
<style>
.float-cloud-enter-active {
  animation: float-cloud 0.1s linear;
}

@-webkit-keyframes float-cloud {
  100% {
    left: 100%;
  }
}
</style>
