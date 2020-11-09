<template>
  <section class="container page-container">
    <h1 class="page-heading">Experiences</h1>

    <div
      v-for="(exp, index) in experiences"
      :key="index"
      class="experience-card"
    >
      <h2 class="company">{{ exp.company }}</h2>
      <!--<p class="location">{{ exp.location }}</p>-->
      <p class="dates">{{ exp.dates }}</p>

      <a v-if="exp.link" :href="`https://${exp.link}}`" target="_blank"
        >{{ exp.link }}o</a
      >

      <h3 class="role flex items-center">{{ exp.role }}</h3>
      <ul class="details ul-square">
        <li v-for="(detail, detailIndex) in exp.details" :key="detailIndex">
          {{ detail }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    experiences() {
      return this.$db.find('experiences')
    },
  },
}
</script>

<style>
.experience-card {
  display: grid;
  grid-template-areas:
    'company'
    'role'
    'dates'
    'location'
    'details';
  grid-template-columns: 1fr;
  grid-row-gap: 0.25em;
}

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

@screen md {
  .experience-card {
    display: grid;
    grid-template-areas:
      'company role'
      'dates details'
      'location details';
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr 2fr;
    grid-row-gap: 0.5em;
    grid-column-gap: 2em;
  }
}
</style>
