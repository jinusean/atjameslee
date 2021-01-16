<template>
  <div>
    <div class="mb-8">
      <slot name="header" />
    </div>
    <div class="sm:flex sm:justify-between">
      <div class="mb-8 sm:mb-0 sm:order-1 flex-1 flex justify-center relative">
        <div>
          <div class="sticky top-1/4">
            <h3 class="mb-2">OPTIONS</h3>
            <div
              class="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                id="imgInput"
                hidden
                type="file"
                accept="image/*"
                @change="onChange"
              />
              <SvgIcon icon="photo" />
              <label
                for="imgInput"
                class="cursor-pointer inline-block w-32 truncate"
                ><code>{{ image.name }}</code></label
              >
            </div>

            <slot name="options" />
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center children:mb-8">
        <!--        <div>-->
        <!--          <h3>Detect on image</h3>-->
        <!--          <FaceImg-->
        <!--            ref="faceImg"-->
        <!--            :model="model"-->
        <!--            class="shadow-3xl"-->
        <!--            :src="image.src"-->
        <!--            :options="options"-->
        <!--            :width="size"-->
        <!--          />-->
        <!--        </div>-->

        <div>
          <h3>Detect on video</h3>
          <FaceVideo
            :model="model"
            class="shadow-3xl"
            :options="options"
            :height="size"
            :width="size"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FaceImg from '@/components/detections/FaceImg'
import FaceVideo from '@/components/detections/FaceVideo'
export default {
  name: 'FRSection',
  components: {
    FaceVideo,
    FaceImg,
  },
  props: {
    img: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      image: {
        name: this.img,
        src: this.$utils.getAsset('/images/' + this.img),
      },
      size: 320,
    }
  },
  methods: {
    reloadImg() {
      this.$refs.faceImg.reload()
    },
    onChange({ target }) {
      const { files } = target
      if (!files || files.length < 1) {
        return
      }
      const [file] = files
      const reader = new FileReader()

      reader.onload = (e) => {
        this.image = {
          name: file.name,
          src: e.target.result,
        }
      }

      reader.readAsDataURL(file)
    },
  },
}
</script>
