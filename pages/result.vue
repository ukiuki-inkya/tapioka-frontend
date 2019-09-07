<template>
  <div>
    <apexchart width="500" type="radar" :options="options" :series="series" />
    <div class="wrapper">
      <canvas
        id="canvas"
        ref="canvas"
        class="canvas"
        width="400px"
        height="730px"
        @click="onCanvasClick"
      />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      tapiokas: [],
      cup: {
        x0: 30,
        x1: 90,
        x2: 310,
        x3: 370,
        y0: 30,
        y1: 700
      },
      rectangle: {
        x0: 90,
        x1: 310,
        y0: 80,
        y1: 650
      },
      maxRadius: 25,
      minRadius: 10,
      dRadius: 2,

      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['やさしい', '冷静', 'うちき', 'ナルシスト', '元気']
        }
      },
      series: [{
        name: 'series-1',
        data: [0.3, 0.1, 0.1, 0.3, 0.2]
      }]
    }
  },

  mounted: function (context) {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')

    this.initTapiokas()

    this.loop()
  },

  methods: {
    initTapiokas() {
      this.tapiokas = []
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: '', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'こんばんは', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
      this.tapiokas.push({ x: this.randX(), y: this.randY(), radius: 10, velocity: this.dRadius, serif: 'おはよう', color: 'black' })
    },

    loop(timestamp) {
      this.ctx.clearRect(0, 0, 400, 730)
      this.drawCup()

      for (const t of this.tapiokas) {
        if (t.radius > this.maxRadius || t.radius <= this.minRadius) {
        //  t.velocity = -1 * t.velocity
        }
        // t.radius += this.velocity
        // console.log(t.velocity)
        this.drawTapioka(t)
      }
      window.requestAnimationFrame(ts => this.loop(ts))
    },

    drawCup() {
      this.ctx.beginPath()
      this.ctx.moveTo(this.cup.x0, this.cup.y0)
      this.ctx.lineTo(this.cup.x1, this.cup.y1)
      this.ctx.lineTo(this.cup.x2, this.cup.y1)
      this.ctx.lineTo(this.cup.x3, this.cup.y0)
      this.ctx.closePath()
      this.ctx.stroke()
    },

    drawTapioka({ x, y, radius, color }) {
      this.ctx.beginPath()
      this.ctx.fillStyle = color
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      this.ctx.fill()
    },

    onCanvasClick(e) {
      const rect = this.canvas.getBoundingClientRect()
      const point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      const clickTapiokas = this.getClickedTapiokas(point)
      for (const t of clickTapiokas) {
        this.onTapiokaClick(t)
      }
    },

    onTapiokaClick(tapioka) {
      const list = this.$store.state.uchiki.serifList
      console.log(list)
      const serif = list[Math.floor(Math.random() * (list.length - 1))]
      console.log(serif)
      const src = tapioka.color
      tapioka.color = 'red'
      const ssu = new SpeechSynthesisUtterance()
      ssu.text = serif
      ssu.lang = 'ja-JP'
      ssu.onend = () => {
        tapioka.color = src
      }
      speechSynthesis.speak(ssu)
    },

    getClickedTapiokas(p) {
      return this.tapiokas.filter(t => this.isHit(p, t))
    },

    isHit(point, tapioka) {
      return Math.pow(tapioka.x - point.x, 2) + Math.pow(tapioka.y - point.y, 2) <= Math.pow(tapioka.radius, 2)
    },

    randX() {
      return Math.random() * (this.rectangle.x1 - this.rectangle.x0) + this.rectangle.x0
    },
    randY() {
      return Math.random() * (this.rectangle.y1 - this.rectangle.y0) + this.rectangle.y0
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
