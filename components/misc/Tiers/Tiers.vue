<template>
  <ul class="w-full">
    <li v-for="tier in data" :key="tier.tier" class="flex items-center my-4">
      <h2
        class="uppercase font-extrabold mx-4 text-3xl w-6 sm:mx-12 sm:text-6xl sm:w-16"
        :class="`text-${tier.color}`"
      >
        {{ tier.tier }}
      </h2>

      <div
        class="flex py-2 px-8 h-24 sm:p-8 sm:h-36 flex-1"
        :class="`bg-${tier.color}`"
      >
        <a
          v-for="animal in tier.list"
          :key="animal"
          class="mr-8 flex items-center hover:scale-125 transform transition"
          :href="getAnimalLink(animal)"
          target="_blank"
        >
          <img
            class="w-auto h-auto max-h-20 max-w-20"
            :alt="animal"
            :src="$utils.getAsset(`images/tiers/${animal}.png`)"
          />
        </a>

        <!--        <img-->
        <!--          v-for="animal in tier.list"-->
        <!--          :key="animal"-->
        <!--          width="20"-->
        <!--          height="20"-->
        <!--          :alt="animal"-->
        <!--          :src="$utils.getAsset(`images/tiers/${animal}.png`)"-->
        <!--        />-->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tiers',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getAnimalLink(animal) {
      if (animal === 'yui') {
        return 'https://www.instagram.com/yui.ams/'
      }
      return `https://en.wikipedia.org/wiki/${animal}`
    },
  },
}
</script>

<style scoped></style>
