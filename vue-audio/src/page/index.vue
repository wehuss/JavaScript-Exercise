<template>
  <div>
    <div class="play">
      {{ value }}
      <button @click="changePlay">{{ isPlay ? "暂停" : "播放" }}</button>
    </div>
    <canvas ref="canvas" width="600" height="600"></canvas>
    <audio ref="audio" :src="currentAudio"></audio>
  </div>
</template>

<script>
import audio1 from '../assets/audio/乌云典当记.mp3'

export default {
  data() {
    return {
      audioList: {
        乌云典当记: audio1,
      },
      currentAudio: audio1,
      isPlay: false,
      render: null,
      requestID: null,
      value: 0,
    }
  },
  mounted() {
    this.createCanvas()
    // this.createRender()
  },
  destroyed() {
    cancelAnimationFrame(this.requestID)
  },
  methods: {
    changePlay() {
      let audio = this.$refs.audio
      if (this.isPlay) {
        audio.pause()
        cancelAnimationFrame(this.requestID)
      } else {
        audio.play()
        if (!this.render) {
          this.createRender()
          this.$nextTick(() => {
            this.render()
          })
        } else {
          this.render()
        }
      }
      this.isPlay = !this.isPlay
    },
    createCanvas() {
      let { canvas } = this.$refs
      let ctx = canvas.getContext('2d')
      let cwidth = canvas.width
      // let cheight = canvas.height
      let cr = 230 //环形半径
      let gradient = ctx.createLinearGradient(0, -cr, 0, -cwidth / 2)
      gradient.addColorStop(0, '#0f0')
      gradient.addColorStop(0.5, '#ff0')
      gradient.addColorStop(1, '#f00')
      ctx.fillStyle = gradient
      // ctx.clearRect(0, 0, cwidth, cheight)
      // ctx.save()
      // ctx.translate(cwidth / 2, cheight / 2)
    },
    createRender() {
      let { canvas, audio } = this.$refs

      let audioCtx = new AudioContext()
      let analyser = audioCtx.createAnalyser()
      let audioSrc = audioCtx.createMediaElementSource(audio)
      audioSrc.connect(analyser)
      analyser.connect(audioCtx.destination)
      analyser.fftSize = 1024

      let PI = Math.PI
      let ctx = canvas.getContext('2d')
      let cwidth = canvas.width
      let cheight = canvas.height
      let cr = 230 //环形半径
      let minHeight = 2
      let meterWidth = 5
      let meterNum = 180 //设置方块的数量，考虑到闭环的关系
      this.render = () => {
        let array = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)
        let step = Math.round((array.length / 2) / meterNum)
        ctx.clearRect(0, 0, cwidth, cheight)
        ctx.save()
        ctx.translate(cwidth / 2, cheight / 2)
        // console.log('array', array)

        for (let i = 0; i < meterNum; i++) {
          let value = array[i * step]
          let meterHeight = (value * (cheight / 2 - cr)) / 256 || minHeight
          ctx.rotate((2 * PI) / meterNum)
          ctx.fillRect(
            -meterWidth / 2,
            -cr - meterHeight,
            meterWidth,
            meterHeight
          )
        }
        ctx.restore()
        // setTimeout(() => {
        //   this.requestID = requestAnimationFrame(this.render)
        // }, 1000)
        this.requestID = requestAnimationFrame(this.render)
      }
    },
  },
}
</script>

<style>
</style>