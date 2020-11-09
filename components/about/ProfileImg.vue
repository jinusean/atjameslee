<template>
  <figure class="profile-img relative text-center">
    <img
      class="inline-block shadow-2xl h-full bg-white rounded-half shadow-lg p-1"
      src="/images/white-shirt.png"
      alt="white shirt"
    />
  </figure>
</template>

<script>
export default {
  name: 'ProfileImg',
}
</script>

<style scoped>
.profile-img {
  margin-top: -12%;
}
.profile-img img {
  border-top: 1px solid gray;
}
</style>
