<template>
  <section class="about">
    <AboutTitle/>

    <div class="about__description">
      <p>
        I'm just a lowly fullstack developer who began his programming journey at the computer science department of
        State
        University of New York - Stony Brook University.
      </p>

      <p>
        I have some prior experience coding in Java and C#, and even MIPS assembly during my time in university.
        Nowadays I do most of my work working on web apps, writing front-end code in Vue and back-end code in Node.
        Please stop by and take a look at my <nuxt-link to="/projects">projects</nuxt-link> to get a feel of how I
        digitally express my offline interests.
      </p>
    </div>


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
import AboutTitle from '../components/about/AboutTitle'
import Tag from '../components/TagsList/Tag'
import skills from '~/database/skills.yaml'

export default {
  components: { Tag, AboutTitle },
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
            if (index !== length -1) {
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
.skill {
  display: inline-block;
}
</style>
