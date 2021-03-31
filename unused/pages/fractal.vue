<template>
  <div class="flex-1 flex flex-col">
    <canvas ref="canvas" class="flex-1 spin" />
    <hr />
    <button ref="button" @click="snowFlake">Generate</button>
    <input id="limit" v-model="limit" type="number" class="w-12" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      len: 100,
      angle: 0,
      branchWidth: 2,
      color1: 'green',
      color2: 'red',
      scale: 0.75,
      rotate: 5,
      limit: 10,

      numSides: 3,
    }
  },
  async mounted() {
    const { canvas } = this.$refs
    const width = (canvas.width = canvas.clientWidth)
    const height = (canvas.height = canvas.clientHeight)
    let limit = 0
    while (limit < this.limit) {
      this.snowFlake(limit)
      limit++
      await new Promise((res) => setTimeout(res, 1000))
    }
  },
  methods: {
    context() {
      return this.$refs.canvas.getContext('2d')
    },
    koch(a, b, limit = this.limit) {
      const context = this.context()
      const [dx, dy] = [b.x - a.x, b.y - a.y]
      const dist = Math.sqrt(dx * dx + dy * dy)
      const unit = dist / 3
      const angle = Math.atan2(dy, dx)

      // This will be the triangular shape that makes the 'points' on the snowflake
      const p1 = {
        x: a.x + dx / this.numSides,
        y: a.y + dy / 3,
      }
      const p3 = {
        x: b.x - dx / this.numSides,
        y: b.y - dy / this.numSides,
      }
      const p2 = {
        x: p1.x + Math.cos(angle - Math.PI / this.numSides) * unit,
        y: p1.y + Math.sin(angle - Math.PI / this.numSides) * unit,
      }

      if (limit > 0) {
        // Decrease limit each time it's called
        this.koch(a, p1, limit - 1)
        this.koch(p1, p2, limit - 1)
        this.koch(p2, p3, limit - 1)
        this.koch(p3, b, limit - 1)
      } else {
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(b.x, b.y)
        context.stroke()
      }
    },
    snowFlake(limit) {
      const { canvas } = this.$refs
      const { width, height } = canvas
      const context = this.context()

      // The starting cordinates, basically tiltiing the Koch
      // shape so that when we add three together they form the snowflake
      const scale = 10 * limit || 1
      const startingPoints = {
        p1: {
          x: 0,
          y: -scale * 3,
        },
        p2: {
          x: scale * 3,
          y: scale * 2,
        },
        p3: {
          x: -scale * 3,
          y: scale * 2,
        },
      }
      context.save()
      context.translate(0.5 * width, 0.5 * height)
      this.koch(startingPoints.p1, startingPoints.p2, limit)
      this.koch(startingPoints.p2, startingPoints.p3, limit)
      this.koch(startingPoints.p3, startingPoints.p1, limit)
      context.restore()
    },
    generateTree() {
      const { canvas } = this.$refs
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      this.drawTree(
        canvas.width / 2,
        canvas.height / 2,
        this.len,
        this.angle,
        this.branchWidth,
        this.color1,
        this.color2
      )
      console.log('generated')
    },
    drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
      const ctx = this.context()
      ctx.beginPath()
      ctx.save()
      ctx.strokeStyle = color1
      ctx.fillStyle = color2
      ctx.lineWidth = branchWidth
      ctx.translate(startX, startY)
      ctx.rotate((angle * Math.PI) / 180) // half circle
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -len) // len is negative for tree to grow upwards
      ctx.stroke()

      if (len < 10) {
        ctx.restore()
        return
      }

      this.drawTree(
        0,
        -len,
        len * this.scale,
        angle + this.rotate,
        branchWidth,
        color1,
        color2
      )
      this.drawTree(
        0,
        -len,
        len * this.scale,
        angle - this.rotate,
        branchWidth,
        color1,
        color2
      )
      ctx.restore()
    },
  },
}
</script>

<style scoped>
.spin {
  animation: spin 3s infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
