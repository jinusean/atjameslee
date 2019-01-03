<template>
  <nuxt-link 
    :to="`projects/${project.id}`"
    class="project-card">
    <div class="project-card__image">
      <img :src="`/images/${project.macimage || project.image}`"/>
    </div>

    <div class="project-card__info">
      <h4>{{ project.title }}</h4>
      <p v-html="project.subtitle"/>
    </div>
  </nuxt-link>
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

<style lang="scss">
.project-card {
  display: block;
  width: 18em;

  /* border: 1px solid transparent; */

  /* border-radius: 1em; */
  margin-bottom: 2em;

  .project-card__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 14em;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 100%;
      transition: all 150ms ease-in-out;
    }
  }

  .project-card__info {
    padding: 0.5em 0;

    h4 {
      margin: 0;
    }

    p {
      margin-bottom: 0;
    }
  }
}

.project-card:hover {
  img {
    transition: all 300ms ease-in-out;
    transform: scale(1.2);

    /* transform: scale(1.5); */
  }
}
</style>
