<template>
  <section class="about">
    <div class="about__title">
      <h1 class="about__title__inner"/>
    </div>

    <div class="about__description">
      <p>
        I'm lowly full stack developer who began his programming journey at the computer science department of a State
        University of New York (Stony Brook). In addition to programming, I've also completed a major and minor in business and political science respectively, and enjoy writing apps
        that relate to these disciplines.
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
              v-for="(skill, index) in skill.skills" 
              :key="index">
              <div v-for="(skillItem, index) in parseSkill(skill)">
                <Tag
                  :tag="skillItem"
                  class-name="skill"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
import Tag from '../components/TagsList/Tag'
import skills from '~/database/skills.yaml'

export default {
  components: { Tag },
  computed: {
    skills() {
      return skills
    }
  }
}
</script>
<style lang="scss">
.about {
  /* display: flex; */

  .about__title {
    //padding-top: $navbar-height;
    box-sizing: border-box;
    height: 100vh;
    margin: -$navbar-height 0 0 0;

    .about__title__inner {
      position: fixed;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8em;
      width: 1100px;
      max-width: 100%;
      margin: auto 0;

      p {
        margin: 0;
      }
    }
  }

  .about__description {
  }
}
</style>
