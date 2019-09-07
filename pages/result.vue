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
      ctx: null
    }
  },

  mounted: function (context) {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')

    this.drawCup()
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
    draw() {
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, 200, 200)
      this.ctx.arc(100, 100, 10, 0, Math.PI * 2)
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
