<template>
  <div class="projects">
    <nuxt-link
      v-for="project in projects" :key="project.id"
      :to="`projects/${project.id}`"
      class="project">
      <div class="project__image">
        <img :src="`/images/${project.id}.png`">
      </div>

      <div class="project__info">
        <h4>{{ project.title }}</h4>
        <p>
          Philippines' first aggregated news site.
        </p>
      </div>

    </nuxt-link>
  </div>
</template>

<script>
import projects from '../utils/projects.yaml'

export default {
  computed: {
    projects() {
      return projects
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
}

.project {
  display: block;
  width: 16em;
  /*border: 1px solid transparent;*/
  /*border-radius: 1em;*/

  .project__image {
    width: 100%;
    max-height: 14em;
    overflow-x: hidden;
    overflow-y: auto;

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      transition: all 150ms ease-in-out;
    }
  }

  .project__info {
    padding: 0.5em 1em;

    h4 {
      margin: 0;
    }
  }
}

.project:hover {
  img {
    transform: scale(2);
    transition: all 300ms ease-in-out;
    /*transform: scale(1.5);*/
  }
}
</style>
