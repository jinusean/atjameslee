<template>
  <div id="resume" class="p-10 bg-white" :style="style">
    <div
      class="grid gap-x-8 children:mb-8"
      style="grid-template-columns: 2fr 1fr"
    >
      <div id="title">
        <h1>{{ user.name }}</h1>
        <p>{{ user.title }}</p>
        <p>Artificial Intelligence Practitioner</p>
      </div>

      <div
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
      </div>

      <div id="left-content" class="children:mb-6">
        <div id="summary">
          <h2>Summary</h2>
          <p>{{ user.summary }}</p>
        </div>

        <div id="experiences">
          <h2>Experiences</h2>
          <div
            v-for="experience in filteredExperiences"
            :key="experience.company"
            class="mb-4"
          >
            <h3>{{ experience.company }}</h3>
            <div class="flex justify-between">
              <h4 class="">{{ experience.role }}</h4>
              <!--              <span>&nbsp;&nbsp;</span>-->
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
        </div>

        <div id="projects">
          <h2>Projects</h2>
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="mb-4"
          >
            {{ project.name }}
            {{ project.description }}
          </div>
        </div>
      </div>

      <div id="right-content" class="children:mb-6">
        <div id="skills">
          <h2>Technologies</h2>
          <ul v-for="skill in filteredSkills" :key="skill.title" class="mb-4">
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
        </div>

        <div id="education">
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
        </div>
      </div>
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
      return ['email', 'phone', 'site', 'repo'].map((name) => {
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
        'wechat-downloads',
        'panas',
        'beauty-quotient',
        'tagalong',
      ]
      return this.projects.filter((project) => projects.includes(project.id))
    },
    style() {
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
      const currentYear = new Date().getFullYear()
      const diff = currentYear - parseInt(year)
      return diff + '+ years'
    },
  },
}
</script>

<style scoped>
#resume {
  font-family: 'Osaka', serif;
  font-size: 12px;
}

a {
  color: inherit !important;
}
time {
  color: midnightblue;
  font-size: 0.9em;
}

h1 {
  letter-spacing: 0.33em;
}
h2 {
  letter-spacing: 0.25em;
  font-weight: 900;
  color: red;
}

h3 {
  font-size: 1.1em;
  letter-spacing: 0.5px;
}
</style>
