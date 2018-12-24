<template>
  <div class="project-card">
    <div class="project-card__image">
      <img :src="`/images/${project.id}.png`">
    </div>
    <div class="project-card__info">
      <a :href="project.link">
        <h3>{{ project.title }}</h3>
      </a>
      <p>{{ project.info }}</p>
      <div class="tags">
        <span 
          v-for="tag in project.tags" 
          :key="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.project-card {
  display: flex;
}
</style>
