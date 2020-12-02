<template>
  <ul class="w-full mx-auto list-none">
    <li v-for="(project, index) in projects" :key="index">
      <div
        class="relative flex items-center justify-center w-full h-56 group overflow-hidden mb-2"
        style="background: #f2f2f2"
      >
        <img
          :src="`/images/${project.images.logo}`"
          :alt="project.name"
          class="block h-3/5 rounded-2xl transform transition duration-300 ease-in group-hover:scale-125"
        />

        <nuxt-link
          :to="`/projects/${project.id}`"
          class="absolute text-6xl text-white font-bold flex items-center justify-center w-full h-full text-center hover:no-underline bg-black opacity-0 transition duration-300 ease-in group-hover:opacity-50"
        >
          <span class="">READ MORE</span>
        </nuxt-link>
      </div>

      <h3>
        <nuxt-link :to="`/projects/${project.id}`">
          {{ project.name }}
        </nuxt-link>
      </h3>

      <p class="mb-2">
        <span>{{ project.owner }}</span> /
        <span>{{ project.type }}</span>
      </p>

      <tags-list :tags="project.tags" />

      <hr v-if="index < projects.length - 1" class="my-6" />
    </li>
  </ul>
</template>

<script>
import TagsList from '@/components/TagsList/TagsList'

export default {
  name: 'ProjectsList',
  components: { TagsList },
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
}
</script>
