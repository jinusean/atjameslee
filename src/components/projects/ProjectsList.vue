<template>
  <ul class="projects__list">
    <li
      v-for="(project, index) in projects"
      :key="index"
      class="projects__list-item">

      <div class="project-image">
        <img
          :src="`/images/${project.images.logo}`"
          :alt="project.name"
          class="project-image__logo">

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
        <span class="project-owner">{{ project.owner }}</span> / <span class="project-type">{{ project.type }}</span>
      </p>

      <tags-list :tags="project.tags" class="project-tags"/>
    </li>
  </ul>
</template>

<script>
import MacImg from '../images/MacImg'
import MonitorImg from '../images/MonitorImg'
import TagsList from '../TagsList/TagsList'

export default {
  name: 'ProjectsList',
  components: { TagsList, MonitorImg, MacImg },
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

  .project-tags {
    margin: 1em 0;

    .tag {
      background: $gray-600;
    }
  }

  li.projects__list-item {
    margin-bottom: 4em;

    .project-image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 17em;
      overflow: hidden;
      background: #f2f2f2;

      img {
        transition: all 300ms ease-in;
      }

      .project-image__logo {
        display: block;
        height: 60%;
        border-radius: 4px;
      }

      .project-image__overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
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
      img {
        transform: scale(1.2);
      }

      .project-image__overlay {
        opacity: 1;
      }
    }

    .project-name {
      margin: 0;
      font-size: 1.5em;
      line-height: 2em;
    }

    .project-description {
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
