<template>
  <el-main 
    v-scroll-spy 
    id="colorlib-main">
    <home-section />

    <about-section />

    <services-section />

    <skills-section />

    <experiences-section />

    <education-section />

    <projects-section />

    <!-- <blog-section/> -->

    <contact-section />
  </el-main>
</template>
<script>
import HomeSection from './JclMain/HomeSection'
import AboutSection from './JclMain/AboutSection'
import SkillsSection from './JclMain/SkillsSection'
import ExperiencesSection from './JclMain/ExperiencesSection'
import BlogSection from './JclMain/BlogSection'
import ServicesSection from './JclMain/ServicesSection'
import EducationSection from './JclMain/EducationSection'
import ProjectsSection from './JclMain/ProjectsSection'
import ContactSection from './JclMain/ContactSection'
export default {
  name: 'JclMain',
  components: {
    ContactSection,
    ProjectsSection,
    EducationSection,
    ServicesSection,
    BlogSection,
    ExperiencesSection,
    SkillsSection,
    AboutSection,
    HomeSection
  }
}
</script>
