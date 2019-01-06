<template>
  <section class="experiences">
    <h1>Experiences</h1>

    <div
      v-for="exp in experiences"
      :key="exp.company"
      class="experience-card">

      <h2 class="company">{{ exp.company }}</h2>
      <p class="location">{{ exp.location }}</p>
      <p class="dates">{{ exp.dates }}</p>

      <a
        v-if="exp.link"
        :href="`https://${exp.link}}`"
        target="_blank">{{ exp.link }}o</a>

      <h3 class="role">{{ exp.role }}</h3>
      <ul class="details ul-square">
        <li
          v-for="(detail, index) in exp.details"
          :key="index">
          <p v-html="detail"/>
        </li>
      </ul>

    </div>
  </section>
</template>
<style lang="scss">
.experiences .experience-card {
  margin-bottom: 2em;
}

.experience-card {
  display: grid;
  grid-template-areas:
    'company role'
    'dates details'
    'location details';
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 1em;
  grid-column-gap: 2em;
  width: 100%;

  .company {
    grid-area: company;
  }

  .meta {
    grid-area: meta;
  }

  .dates {
    grid-area: dates;
    font-weight: 600;
  }

  .location {
    grid-area: location;
    font-weight: 600;
  }

  .role {
    grid-area: role;
  }

  .details {
    grid-area: details;
  }

  h2,h3, ul,p {
    margin: 0;
  }

  p {
    margin-top: 0;
  }

  li:not(:last-child) {
    margin-bottom: 0.5em;
  }
}

@include media-breakpoint-down(sm) {
  .experience-card {
    display: grid;
    grid-template-areas:
      'company'
      'role'
      'dates'
      'location'
      'details';
    grid-template-columns: 1fr;
    grid-row-gap: 0.5em;
  }
}
</style>


<script>
import experiences from '../utils/experiences.yaml'

export default {
  computed: {
    experiences() {
      return experiences
    }
  }
}
</script>
