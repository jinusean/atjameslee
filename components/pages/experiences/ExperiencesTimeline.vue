<template>
  <ul class="experiences__list">
    <li
      v-for="(exp, index) in experiences"
      :key="index"
      class="experiences__list-item"
    >
      <div class="dates">
        <time>{{ exp.dates.end }}</time>
        <time>{{ exp.dates.start }}</time>
      </div>

      <div class="experience">
        <h3 class="experience__title">
          <a v-if="exp.link" :href="exp.link" target="_blank">
            {{ exp.title }}
          </a>
          <span v-else>
            {{ exp.title }}
          </span>
        </h3>

        <ul
          v-if="exp.aprojects && exp.aprojects.length > 0"
          class="experience__projects"
        >
          <li
            v-for="(project, index) in exp.aprojects"
            :key="index"
            class="experience__project"
          >
            <div class="project-info">
              <h4 class="project-info__title">
                <a v-if="project.link" :href="project.link" target="_blank">
                  {{ project.title }}
                </a>
                <span v-else>
                  {{ project.title }}
                </span>
              </h4>
              <i class="project-info__subtitle">
                {{ project.subtitle }}
              </i>
              <p class="project-info__details">
                {{ project.details }}
              </p>
            </div>

            <div
              v-if="project.tags && project.tags.length > 0"
              class="project-tags"
            >
              <span v-for="tag in project.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>

            <div v-if="project.image" class="project-image">
              <img :src="`/images/${project.image}`" :alt="project.title" />
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ExperienceList',
  props: {
    experiences: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.experiences__list {
  padding: 0;
  margin: 0;
  list-style: none;

  .experiences__list-item {
    display: grid;
    grid-template-columns: 8em 1fr;
    grid-gap: 2em;
    margin-bottom: 2em;

    .dates {
      position: relative;
      display: flex;
      flex-direction: column;
      border-right: 1px solid grey;

      &::before {
        position: absolute;
        right: -0.25em;
        width: 0.5em;
        height: 0.5em;
        margin-top: -0.25em;
        content: ' ';
        background: grey;
        border-radius: 50%;
      }

      time {
        display: block;
        padding-right: 1em;
        text-align: right;
      }
    }
  }

  &:first-child .dates {
    margin-top: 0.5em;

    time:first-child {
      margin-top: -0.5em;
    }
  }

  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.experiences {
  position: relative;

  .timeline {
    position: absolute;
    top: 0.5em;
    bottom: 0.5em;
    z-index: -1;
    width: calc(8em - 1px);
    border-right: 1px solid lightgrey;
  }
}

.experiences__list .experiences__list-item .experience {
  .experience__title {
    margin-top: 0;
  }

  .experience__projects {
    padding-left: 0;
    list-style: none;

    .experience__project {
      display: grid;
      grid-template-areas:
        'info image'
        'tags image';
      grid-template-rows: 1fr auto;
      grid-column-gap: 2em;

      .project-info {
        grid-area: info;

        .project-info__title {
          margin-top: 0;
          margin-bottom: 1em;
        }

        .project-info__subtitle {
        }

        .project-info__details {
        }
      }

      .project-image {
        grid-area: image;
        width: 14em;

        img {
          max-width: 100%;
          border-radius: 0.5em;
        }
      }

      .project-tags {
        grid-area: tags;

        .tag {
          margin-right: 0.25em;
          margin-bottom: 0.25em;
        }
      }
    }

    .experience__project:not(:last-child) {
      margin-bottom: 2em;
    }
  }
}
</style>
