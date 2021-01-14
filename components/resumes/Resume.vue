<template>
  <div id="resume" class="bg-white" :style="style">
    <h1>{{ user.name }}</h1>
    <div
      class="grid gap-x-8 children:mb-6"
      style="grid-template-columns: 66% auto"
    >
      <section id="title">
        <div
          v-for="title in user.titles"
          :key="title.name"
          class="flex justify-between"
        >
          <p class="text-black">{{ title.name }}</p>
          <time>{{ title.time }}</time>
        </div>
      </section>

      <section
        id="contact-details"
        class="grid gap-x-4"
        style="grid-template-columns: repeat(2, min-content)"
      >
        <template v-for="detail in userDetails">
          <span :key="detail.name" class="text-black font-bold"
            >{{ detail.name[0].toUpperCase() }}
          </span>
          <a :key="detail.name + '_value'" :href="detail.href">{{
            detail.text
          }}</a>
        </template>
      </section>

      <div id="left-content" class="children:mb-4">
        <section id="summary">
          <h2>Career Objectives</h2>
          <div
            v-for="val in $db.find('objectives')"
            :key="val.name"
            class="mb-1"
          >
            <div class="flex justify-between">
              <h4>
                {{ val.name }}
              </h4>
              <time>
                {{ val.year }}
              </time>
            </div>
            <p>{{ val.text }}</p>
          </div>
        </section>

        <section id="experiences">
          <h2>Experiences</h2>
          <div
            v-for="experience in filteredExperiences"
            :key="experience.company"
            class="mb-2"
          >
            <h3>{{ experience.company }}</h3>
            <div class="flex justify-between">
              <h4 class="">{{ experience.role }}</h4>
              <time>{{ formatDate(experience.dates) }}</time>
            </div>

            <ul>
              <li
                v-for="(detail, index) in experience.details"
                :key="index"
                class="ml-4 list-disc"
              >
                {{ detail }}
              </li>
            </ul>
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ul>
            <li
              v-for="project in filteredProjects"
              :key="project.id"
              class="mb-1"
            >
              <div class="flex justify-between">
                <h4 class="">{{ project.name }}</h4>
                <time>{{ project.date }}</time>
              </div>
              <p>
                {{ project.description }} with
                <span class="italic">{{ project.tags[0] }}</span>
              </p>
            </li>
          </ul>
        </section>
      </div>

      <div id="right-content" class="children:mb-4">
        <section id="skills">
          <h2>Technologies</h2>
          <ul v-for="skill in filteredSkills" :key="skill.title" class="mb-2">
            <li class="flex justify-between">
              <h3>{{ skill.title }}</h3>
              <time>{{ getSkillDuration(skill.start) }}</time>
            </li>
            <li v-for="technology in skill.technologies" :key="technology">
              {{ technology }}
            </li>
            <li v-for="skillName in skill.skills" :key="skillName">
              {{ skillName }}
            </li>
          </ul>
        </section>

        <section id="education">
          <h2>Education</h2>
          <ul
            v-for="education in user.education"
            :key="education.organization"
            class="mb-4"
          >
            <li class="flex justify-between">
              <h3>{{ education.organization }}</h3>
              <time>{{ education.date }}</time>
            </li>
            <li v-for="detail in education.details" :key="detail">
              {{ detail }}
            </li>
          </ul>
        </section>

        <section id="interests">
          <h2>Interests</h2>
          <ul v-for="interest in interests" :key="interest.name" class="mb-4">
            <li>
              <h3>{{ interest.name }}</h3>
            </li>
            <li v-for="detail in interest.details" :key="detail">
              {{ detail }}
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="fixed">
      <span v-for="text in $db.find('glossary')" :key="text" class="glossary">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
import databaseMixin from '@/mixins/database'
import paperSize from 'paper-size'

export default {
  name: 'Resume',
  mixins: [databaseMixin],
  data() {
    return {
      format: 'letter',
    }
  },
  computed: {
    userDetails() {
      return ['email', 'phone', 'site'].map((name) => {
        const text = this.user[name]
        let href = ''
        switch (name) {
          case 'email':
            href = `mailto:${text}`
            break
          case 'phone':
            href = 'tel:' + text.replace(/[^0-9+]/g, '')
            break
          case 'site':
          case 'repo':
            href = `https://${text}`
            break
        }
        return { name, href, text }
      })
    },
    filteredExperiences() {
      return this.experiences.filter(
        (experience) =>
          experience.company.toLowerCase() !== 'stony brook university'
      )
    },
    filteredSkills() {
      return this.skills.filter(
        (skill) => skill.title.toLowerCase() !== 'devops'
      )
    },
    filteredProjects() {
      const projects = [
        'facial-recognition',
        'wechat-downloads',
        'panas',
        'tagalong',
      ]
      return this.projects.filter((project) => projects.includes(project.id))
    },
    style() {
      return {}
      const [width, height] = paperSize
        .getSize(this.format, { unit: 'mm' })
        .map((size) => size + 'mm')
      return {
        width,
        height,
      }
    },
  },
  methods: {
    formatDate(dateString) {
      return dateString
        .split(' - ')
        .map((string) => {
          let [month, year] = string.split(' ')
          string = month + ' 1,' + year
          const date = new Date(string)
          month = date.getMonth() + 1
          year = date.getFullYear()
          return `${month}/${year}`
        })
        .join(' - ')
    },
    getSkillDuration(year) {
      const currentYear = new Date().getFullYear() - 1
      const diff = currentYear - parseInt(year)
      return diff + '+ years'
    },
  },
}
</script>

<style>
@media print {
  html,
  body,
  #resume {
    font-family: 'Arial', sans-serif !important;
  }
}
#resume {
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  width: 8.5in;
  height: 11in;
  overflow: hidden;
}

a {
  color: inherit !important;
}

time {
  font-family: 'Lucida Grande', sans-serif;
  color: midnightblue;
  font-size: 1em;
}

h1 {
  color: black;
  font-size: 2em;
  font-weight: 900;
  letter-spacing: 0.25em;
}

h2 {
  color: indianred;
  letter-spacing: 0.25em;
  font-weight: 800;
  margin-bottom: 0.25em;
}

h3 {
  font-size: 1.1em;
  letter-spacing: 0.5px;
}

.glossary {
  color: transparent;
  text-shadow: 0 0 0 #fff;
  font-size: 0.1pt;
}
</style>
