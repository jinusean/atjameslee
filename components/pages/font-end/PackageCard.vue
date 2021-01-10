<template>
  <div
    class="rounded border-gray-400 border sm:flex flex-row sm:min-h-48 sm:hover-translate-y"
  >
    <nuxt-link
      :to="`#${data.id}`"
      class="flex justify-center items-center p-4 bg-gray-100 sm:border-b-0 border-gray-100 sm:w-64 dark:bg-gray-900"
      replace
    >
      <img class="h-32 sm:max-h-full" :src="packageImg" :alt="data.id" />
    </nuxt-link>

    <nuxt-link replace :to="`#${data.id}`" class="hover:no-underline sm:flex-1">
      <div class="p-4">
        <h3 class="capitalize">{{ title }}</h3>
        <h4 class="font-normal text-sm">{{ data.subtitle }}</h4>
        <hr class="my-2" />
        <p class="text-gray-800 dark:text-white" v-html="data.info"></p>
      </div>
    </nuxt-link>

    <div
      class="flex items-center py-4 px-3 bg-gray-200 space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4 dark:bg-gray-800"
    >
      <a
        v-if="data.github"
        :href="`https://github.com/jinusean/${data.id}`"
        target="_blank"
      >
        <SvgIcon icon="github" size="2" :invert="$lumin.isDark" />
        <!--        <img src="~/assets/logos/github.png" class="w-8" :alt="title" />-->
      </a>
      <a
        v-if="data.gitlab"
        :href="`https://gitlab.com/jinusean/${data.id}`"
        target="_blank"
      >
        <img src="~/assets/logos/gitlab.png" class="w-8" :alt="title" />
      </a>
      <a
        v-if="data.npm"
        :href="`https://www.npmjs.com/package/${data.id}`"
        target="_blank"
      >
        <img src="~/assets/logos/npm.png" class="w-8" :alt="title" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.data.id.split('-').join(' ')
    },
    packageImg() {
      return require(`@/assets/images/${this.data.id}.png`)
    },
  },
}
</script>

<style scroped>
.package-card {
  grid-template-rows: 1fr 1fr auto;
  grid-template-columns: auto;
  grid-gap: 0;
  height: 24em;
  overflow: hidden;
  border: 1px solid gray;
  border-radius: 0.5em;
  box-shadow: none;
  transition: transform 300ms ease-in, box-shadow 300ms ease-in;
  /* border-radius: 0; */
}

.package-card__preview {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10em;
  overflow: hidden;
}

.package-card__preview img {
  width: auto;
  min-height: 100%;
}

.package-card__title {
  margin: 0 0 0.5em 0;
  /*color: $link-color;*/
  text-transform: capitalize;
}

.package-card:hover .package-card__title {
  text-decoration: underline;
}

.package-card__subtitle {
  margin-top: 0;
}

.package-card__info {
  padding: 1em;
  overflow: hidden;
}

.package-card__info p {
  margin: 0;
}

.package-card__links {
  display: flex;
  align-items: center;
  padding: 1em 0.75em;
  background: gray;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

.package-card__links a {
  display: block;
  margin-right: 1em;
  margin-bottom: 1em;
}

.package-card__links a img {
  width: 2em;
  max-height: 2em;
}

.package-card__links a img:hover {
  opacity: 0.5;
}

.package-card__links a:last-child {
  margin-right: 0;
}

.package-card__preview img {
  width: auto;
  min-height: 100%;
}

@screen sm {
  .package-card {
    display: grid;
    flex: 1;
    grid-template-columns: auto 1fr auto;
    grid-gap: 2em;
    height: 12em;
    /*overflow: hidden;*/
    /*border: 1px solid gray;*/
    /*border-radius: 0.5em;*/
    /*box-shadow: none;*/
    /*transition: transform 300ms ease-in, box-shadow 300ms ease-in;*/
  }

  .package-card__preview {
    display: block;
    width: 16em;
    padding: 1em;
  }

  .package-card__preview img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .package-card__links {
    display: block;
  }

  .package-card__links a {
    margin-right: 0;
  }
}

@screen md {
  .package-card:hover {
    color: inherit;
    transform: translateY(-5px);
    box-shadow: 0, 1em, 1em, -1em;
  }
}
</style>
