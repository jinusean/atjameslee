<template>
  <div class="bg-gray-100 dark:bg-dark dark:border-white dark:border-t">
    <div
      class="container w-container my-4 flex flex-wrap items-center justify-between"
    >
      <a class="font-bold mb-4 sm:mb-0" href="mailto:atjameslee@gmail.com"
        >atjameslee@gmail.com</a
      >
      <ul class="flex justify-end m-0 space-x-8">
        <li
          v-for="(href, key) in links"
          :key="key"
          class="relative flex flex-col items-center"
        >
          <a :href="href" target="_blank" :alt="key">
            <SvgIcon :invert="$lumin.isDark" size="2" :icon="key" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JclFooter',
  computed: {
    links() {
      return {
        email: 'mailto:atjameslee@gmail.com',
        github: 'https://github.com/jinusean',
        resume: '/James_Lee_Resume.pdf',
      }
    },
  },
}
</script>
