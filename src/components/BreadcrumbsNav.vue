<template>
  <nav class="breadcrumbs-nav">
    <div 
      v-for="(crumb, index) in crumbs" 
      :key="index">
      <span 
        v-if="index !== 0" 
        class="separator">&nbsp;/</span>
      <nuxt-link
        v-if="crumb.link"
        :to="crumb.link">
        {{ crumb.path }}
      </nuxt-link>
      <span v-else>
        {{ crumb.path }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BreadcrumbsNav',
  computed: {
    crumbs() {
      const paths = this.$route.path.split('/')
      const crumbs = []
      const makeLink = index => {
        let link = ''
        for (let i = 0; i < index; i++) {
          link += `/${paths[index]}`
        }
        return link
      }

      // Skip first path because it's empty
      for (let i = 1; i < paths.length; i++) {
        let path = paths[i]
        let link = ''

        if (!path) {
          path = 'about'
          link = '/'
        } else if (i !== paths.length - 1) {
          link = makeLink(i)
        }

        crumbs.push({ path, link })
      }

      return crumbs
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs-nav {
  display: flex;
  margin: 1.5em 0;

  .separator {
    opacity: 0.5;
  }
}
</style>
