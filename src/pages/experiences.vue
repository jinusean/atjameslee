<template>
  <section class="experiences">
    <h1>Experiences</h1>
    <!--<ExperienceList :experiences="experiences" />-->
    <div
      v-for="exp in experiences"
      :key="exp.company"
      class="experience-card">

      <div class="experience-card__company">
        <h2 class="company-name">{{ exp.company }}</h2>
        <p>{{ exp.location }}</p>
        <p class="company-dates">{{ exp.dates }}</p>
        <a
          v-if="exp.link"
          :href="`https://${exp.link}}`"
          target="_blank">{{ exp.link }}o</a>
      </div>

      <div class="experience-card__role">
        <h2 class="role-name">{{ exp.role }}</h2>
        <ul class="role-details">
          <li
            v-for="(detail, index) in exp.details"
            :key="index">
            <p v-html="detail"/>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.experiences .experience-card {
  margin-bottom: 2em;
}

.experience-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 2em;
  width: 100%;
}

.experience-card__company {
  .company-name {
  }

  .company-dates {
  }
}

.experience-card__role {
  .role-name {
  }

  .role-details {

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
