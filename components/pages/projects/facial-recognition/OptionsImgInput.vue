<template>
  <div class="flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
    <input
      id="imgInput"
      hidden
      type="file"
      accept="image/*"
      @change="onChange"
    />
    <SvgIcon icon="photo" />
    <label for="imgInput" class="cursor-pointer inline-block w-32 truncate"
      ><code>{{ filename }}</code></label
    >
  </div>
</template>
<script>
export default {
  name: 'OptionsImgInput',
  props: {
    filename: {
      type: String,
      required: true,
    },
  },
  methods: {
    onChange({ target }) {
      const { files } = target
      if (!files || files.length < 1) {
        return
      }
      this.$emit('change', files)
    },
  },
}
</script>
