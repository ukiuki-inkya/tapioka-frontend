<template>
  <section class="container">
    <h1 class="home__title" @click="navigateTop">
      <img class="home__title-image" src="~/assets/icons/logo.png" alt="タピオカ診断">
      タピオカ診断
    </h1>

    <div v-if="!image">
      <div class="home__description-box">
        <h2 class="home__description-box-title">
          こんなことできるよ
        </h2>
        <span class="home__description-box-text">みたいなことなんか簡潔に<br>書きたいかも</span>
      </div>
      <img class="home__iphone-demo" src="~/assets/images/iphone-demo.png" alt="">
      <label for="image-selector" class="home__large-button">
        <input id="image-selector" ref="imageSelector" type="file" class="home__image-selector" @change="previewImage">
        <img class="home__large-button-icon" src="~/assets/icons/focus_white.png" alt="写真を選択する">
        写真を選択
      </label>
    </div>

    <div v-else class="home__image-selected">
      <div class="home__image-preview">
        <img class="home__image-preview-image" :src="image" alt="selected image">
        <button class="home__small-button" @click="clearImage">
          <img class="home__small-button-icon" src="~/assets/icons/recycle.png" alt="写真を選択する">
          えらびなおす
        </button>
      </div>
      <template v-if="isUploading">
        <span>アップロードしています</span>
      </template>
      <template v-else>
        <button class="home__large-button" @click="sendImage">
          <img class="home__large-button-icon" src="~/assets/icons/upload_white.png" alt="写真を選択する">
          診断する
        </button>
      </template>
    </div>
  </section>
</template>

<script>
import { getConfig } from '../config/config'

export default {
  data() {
    return {
      image: '',
      isUploading: false
    }
  },
  methods: {
    navigateTop: function () {
      this.$router.push('/')
    },
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

      this.isUploading = true

      this.$axios.post(url, { image: this.image })
        .then((response) => {
          console.log(response)
          this.$store.commit('tapis/setResultState', response)
          this.$router.push('/result')
        }).catch((err) => {
          console.error(err)
        }).finally(() => {
          this.isUploading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .container {
    text-align: center;
    padding-bottom: 80px;
    min-height: 100vh;
    background-image: url(/_nuxt/assets/images/background-bottom.png);
    background-position: bottom left;
    background-repeat: repeat-x;
    background-size: 320px 183px;
  }
  .home {
    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }
    &__title-image {
      height: 80px;
    }
    &__large-button {
      width: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #403836;
      color: #f8f8f8;
      border-radius: 8px;
      border: none;
      padding: 16px 32px;
      margin: 16px auto;
      font-size: 24px;
    }
    &__large-button-icon {
      width: 32px;
      margin-right: 16px;
    }
    &__image-selector-wrapper label {
      background-color: #403836;
      border-radius: 8px;
      border: none;
    }
    &__small-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #C0B4A9;
      border-radius: 8px;
      border: none;
      padding: 8px 16px;
      margin: 8px auto 0 auto;
    }
    &__small-button-icon {
      width: 24px;
      margin-right: 8px;
    }
    &__description-box {
      width: 320px;
      padding: 16px;
      margin: 16px auto;
      background-color: #F7F2E5;
      border-radius: 8px;
    }
    &__description-box-title {
      font-size: 24px;
    }
    &__description-box-text {
      font-size: 18px;
    }
    &__iphone-demo {
      width: 200px;
    }
    &__image-selector {
      display: none;
    }
    &__image-selected {
      max-width: 480px;
      margin: 0 auto;
    }
    &__image-preview {
      background-color: #F7F2E5;
      border-radius: 8px;
      padding: 16px;
      margin: 0 16px;
    }
    &__image-preview-image {
      width: 100%;
      border-radius: 4px;
    }
  }
</style>
