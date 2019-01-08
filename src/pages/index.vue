<template>
  <section class="about">
    <CoverPage/>

    <ProfileCard/>


    <div class="about__skills">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="skill-card">
        <h3>
          {{ skill.title }}
        </h3>
        <div class="skill-card__skills">
          <ul>
            <li
              v-for="(line, index) in skill.skills"
              :key="index">
              <span
                v-for="(skillItem, index) in parseLine(line)"
                :key="index">
                <Tag
                  :tag="skillItem"
                  class-name="skill"/>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div style="height:50vh;"/>

  </section>
</template>
<script>
import CoverPage from '../components/about/CoverPage'
import Tag from '../components/TagsList/Tag'
import skills from '~/database/skills.yaml'
import ProfileCard from '../components/about/ProfileCard'

export default {
  components: { ProfileCard, Tag, CoverPage },
  computed: {
    skills() {
      return skills
    }
  },
  methods: {
    parseLine(line) {
      const skills = []

      line.split(' ').forEach(item => {
        if (item.includes('/')) {
          const splits = item.split('/')
          const { length } = splits
          splits.forEach((splitItem, index) => {
            this.parseSkill(splitItem, skills)
            if (index !== length - 1) {
              skills.push('/')
            }
          })
        } else {
          this.parseSkill(item, skills)
        }
        skills.push(' ')
      })

      return skills
    },
    parseSkill(skill, skills) {
      if (skill[0] === '(') {
        skills.push('(')
        skills.push(skill.substring(1, skill.length - 1))
        skills.push(')')
      } else {
        skills.push(skill)
      }
    }
  }
}
</script>
<style lang="scss">
.about > * {
  /*margin-bottom: 2em;*/
}

.skill {
  display: inline-block;
}
</style>
