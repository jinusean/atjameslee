<template>
  <div>
    <div class="mb-8">
      <slot name="header" />
    </div>
    <div class="sm:flex sm:justify-between">
      <div class="mb-8 sm:mb-0 sm:order-1 flex-1 flex justify-center">
        <div class="fixed">
          <h3 class="mb-2">OPTIONS</h3>
          <div
            v-if="image"
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

      <div class="flex flex-col items-center children:mb-8">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FRSection',
  model: {
    prop: 'image',
    event: 'image',
  },
  props: {
    image: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onChange({ target }) {
      const { files } = target
      if (!files || files.length < 1) {
        return
      }
      const [file] = files
      const reader = new FileReader()

      reader.onload = (e) => {
        const image = {
          name: file.name,
          src: e.target.result,
        }
        this.$emit('image', image)
      }

      reader.readAsDataURL(file)
    },
  },
}
</script>
