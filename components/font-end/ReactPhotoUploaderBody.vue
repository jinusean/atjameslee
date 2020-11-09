<template>
  <div class="flex justify-center items-center h-full">
    <ReactPhotoUploader />
  </div>
</template>

<script>
import ReactPhotoUploader from 'react-photo-uploader'

export default {
  name: 'ReactPhotoUploaderBody',
  components: {
    ReactPhotoUploader,
  },
}
</script>
<style>
.photo-uploader-container {
  max-width: 100%;
}

#fileInput {
  left: 0;
}
</style>
