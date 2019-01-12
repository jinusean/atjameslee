<template>
  <div class="skills-cards">
    <no-ssr>
      <div
        v-scroll-reveal="{origin: slideIn[index], viewFactor: PHI_B }"
        v-for="(skill, index) in skills"
        :key="index"
        class="skill-card">
        <h3 class="skill-card__title">
          {{ skill.title }}
        </h3>
        <div class="skill-card__skills">
          <no-ssr>
            <ul v-scroll-reveal="{origin: 'bottom', viewFactor: PHI_B }">
              <li
                v-for="(skill, index) in skill.skills"
                :key="index">
                <span class="skill">
                  {{ skill }}
                </span>
              </li>
            </ul>
          </no-ssr>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'SkillsCards',
  computed: {
    skills() {
      return this.$store.state.skills
    },
    slideIn() {
      return this.$store.state.breakpoint !== 'sm'
        ? ['left', 'bottom', 'right']
        : ['left', 'left', 'left']
    }
  }
}
</script>

<style lang="scss" scoped>
.skills-cards {
  display: flex;
  justify-content: space-around;
}

.skill-card {
  .skill-card__title {
    font-size: 2em;
    text-transform: uppercase;
  }

  .skill {
    display: inline-block;
    font-size: 1.2em;
    margin-bottom: 0.25em;
    color: $primary-color;
  }
}

@include media-breakpoint-down(sm) {
  .skills-cards {
    display: block;
  }
}
</style>
