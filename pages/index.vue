<template>
  <section class="container">
    <div>
      <h1 class="title">
        タピオカ診断
      </h1>

      <div v-if="!image">
        <input ref="imageSelector" type="file" class="custom-file-input" @change="previewImage">
      </div>

      <div v-else>
        <div class="image-preview">
          <img :src="image" alt="selected image">
        </div>
        <button @click="clearImage">
          えらびなおす
        </button>
        <button @click="sendImage">
          アップロード
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { getConfig } from '../config/config'

export default {
  data() {
    return {
      image: ''
    }
  },
  methods: {
    previewImage: function () {
      const selectedImage = this.$refs.imageSelector.files[0]

      if (!selectedImage) {
        return
      }

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      toBase64(selectedImage)
        .then((encodedImage) => {
          this.image = encodedImage
        })
        .catch(() => alert('画像の取得に失敗しました'))
    },
    clearImage: function () {
      this.image = ''
    },
    sendImage: function () {
      const config = getConfig()
      const url = config.api.endpoint + config.api.urls.sendImage

      this.$axios.post(url, { image: this.image })
        .then((response) => {
          this.$store.commit('setResultState', response)
          alert('upload complete')
          // TODO: ページ遷移する this.$router.push('')
        })
    }
  }
}
</script>

<style>
</style>
