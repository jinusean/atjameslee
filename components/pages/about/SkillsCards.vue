<template>
  <div class="flex flex-col sm:flex-row sm:justify-between">
    <client-only>
      <div
        v-for="(skill, index) in skills"
        :key="index"
        v-scroll-reveal="{ origin: 'left' }"
        class="mb-6 sm:mb-0 last:mb-0"
      >
        <h3 class="uppercase font-bold text-2xl mb-1">
          {{ skill.title }}
        </h3>
        <div>
          <ul>
            <li v-for="(text, skillIndex) in skill.skills" :key="skillIndex">
              <span class="inline-block">
                {{ text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'SkillsCards',
  computed: {
    slideIn() {
      return ['left', 'bottom', 'right']
      // ? ['left', 'bottom', 'right']
      // : ['left', 'left', 'left']
    },
    skills() {
      return this.$db.find('skills')
    },
  },
}
</script>
