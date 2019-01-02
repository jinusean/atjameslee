<template>
  <ul class="projects__list">
    <li
      v-for="(project, index) in projects"
      :key="index"
      class="projects__list-item">

      <div class="project-image">
        <figure
          v-if="project.images.logo"
          class="project-image__logo">
          <img
            :src="`/images/${project.images.logo}`"
            :alt="project.name">
        </figure>

        <MacImg
          v-else-if="project.images.banner"
          :height="14"
          :src="`/images/${project.images.banner}`"/>

        <nuxt-link 
          :to="`/projects/${project.id}`"
          class="project-image__overlay">
          <p>
            READ MORE
          </p>
        </nuxt-link>
      </div>

      <h3 class="project-name">
        <nuxt-link :to="`/projects/${project.id}`">
          {{ project.name }}
        </nuxt-link>
      </h3>
      <p class="project-description">
        {{ project.description }}
      </p>

      <p class="project-info">
      <span class="project-owner">{{ project.owner }}</span> / <span class="project-type">{{ project.type }}</span></p>
    </li>
  </ul>
</template>

<script>
import MacImg from './MacImg'
import MonitorImg from './MonitorImg'

export default {
  name: 'ProjectsList',
  components: { MonitorImg, MacImg },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
ul.projects__list {
  /* margin: 0; */

  /* width: 800px; */
  width: 100%;
  padding: 0;
  margin: 0 auto;
  list-style: none;

  li.projects__list-item {
    margin-bottom: 4em;

    .project-image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 17em;
      background: #f2f2f2;

      .project-image__logo {
        img {
          height: 80%;
          border-radius: 12px;
        }
      }

      figure img {
        transition: all 300ms ease-in;
      }

      .project-image__overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        background: rgba(black, 0.5);
        opacity: 0;
        transition: 300ms ease-in;

        p {
          font-size: 6em;
          font-weight: bold;
          color: white;
        }
      }
    }

    .project-image:hover {
      figure {
        img {
          transform: scale(1.2);
        }
      }

      .project-image__overlay {
        opacity: 1;
      }
    }

    .project-name {
      margin-bottom: 0;
    }

    .project-description{
      margin-top: 0;
    }

    .project-info {
      .project-owner {
      }

      .project-type {
      }
    }
  }
}
</style>
