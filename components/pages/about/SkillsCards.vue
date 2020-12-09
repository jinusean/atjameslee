<template>
  <div class="flex flex-col sm:flex-row sm:justify-between">
    <client-only>
      <div
        v-for="(skill, skillIndex) in skills"
        :key="skillIndex"
        v-scroll-reveal="{ origin: 'left' }"
        class="mb-6 sm:mb-0 last:mb-0"
      >
        <h3 class="uppercase font-bold text-2xl mb-1">
          {{ skill.title }}
        </h3>
        <div>
          <ul>
            <template v-for="(type, index) in ['technologies', 'skills']">
              <li
                v-for="(text, textIndex) in skill[type]"
                :key="type + index + textIndex"
              >
                <span class="inline-block">
                  {{ text }}
                </span>
              </li>
            </template>
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
    skills() {
      return this.$db.find('skills')
    },
  },
}
</script>
