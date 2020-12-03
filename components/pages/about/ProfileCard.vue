<template>
  <div class="w-full text-black">
    <figure class="relative text-center">
      <img
        class="inline-block h-full bg-white rounded-xl shadow-lg p-1 sm:p-0"
        src="@/assets/images/white-shirt.png"
        alt="white shirt"
      />
    </figure>

    <client-only>
      <div
        v-scroll-reveal="{ origin: 'bottom', viewFactor: PHI_B }"
        class="w-full sm:max-w-3xl text-left sm:text-center my-0 mx-auto"
      >
        <nuxt-content :document="aboutMe" />
      </div>
    </client-only>
  </div>
</template>

<script>
// import aboutMe from '@/content/about-me.md'

export default {
  name: 'ProfileCard',
  async asyncData({ $content }) {
    const aboutMe = await $content('about-me')
    console.log('oaisdjfoisajfiosadji')
    console.log(aboutMe)
    return {
      aboutMe,
    }
  },
}
</script>
