<template>
  <div class="wrapper">
    <canvas id="canvas" ref="canvas" class="canvas" width="400px" height="730px" />
  </div>
</template>

<script>
export default {

  data() {
    return {
      canvas: null,
      ctx: null,
      tapiokas: []
    }
  },

  mounted: function (context) {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')

    this.tapiokas.push({ x: 40, y: 30, radius: 10 })
    this.tapiokas.push({ x: 30, y: 90, radius: 10 })
    this.loop()
  },

  methods: {
    drawCup() {
      this.ctx.beginPath()
      this.ctx.moveTo(30, 30)
      this.ctx.lineTo(90, 700)
      this.ctx.lineTo(310, 700)
      this.ctx.lineTo(370, 30)
      this.ctx.closePath()
      this.ctx.stroke()
    },

    loop(timestamp) {
      this.ctx.clearRect(0, 0, 400, 730)
      this.drawCup()

      for (const t of this.tapiokas) {
        // t.x += 1
        this.drawTapioka(t)
      }
      window.requestAnimationFrame(ts => this.loop(ts))
    },

    drawTapioka({ x, y, radius }) {
      this.ctx.beginPath()
      // this.ctx.fillStyle = 'rgb(0, 0, 0)'
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

}
</script>

<style>
  .wrapper {
    margin: 0px;
    width: 100%;
    height: 730px;
    text-align: center;
  }
  .canvas {
    border: none;
    margin: 0px auto;
  }
</style>
