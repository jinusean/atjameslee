<template>
  <div class="jcl-navbar__links-wrapper">

    <button
      class="btn-toggler"
      @click="isDropdownOpen = !isDropdownOpen"/>

    <ul
      v-if="isDropdownOpen"
      class="jcl-navbar__links">
      <nuxt-link
        v-for="(link, index) in links"
        :key="index"
        :class="getLinkClass(link)"
        :to="`/${link === 'about' ? '' : link}`"
        tag="li"
        class="jcl-navbar__link">
        {{ link }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(sm) {
  .jcl-navbar {
    transition: box-shadow 300ms ease-out;
    @include box-shadow(0, 0.25em, 1em, -0.5em);

    .jcl-navbar__links {
    }

    &.jcl-navbar-open {
      box-shadow: none;
    }
  }

  .jcl-navbar__content {
    align-items: flex-start;
    overflow: hidden;
    text-align: right;

    .btn-toggler {
      display: inline-block;
    }

    .jcl-navbar__links {
      width: 100vw;
      height: 0;
      margin: 0 (-$layout-padding) 0 0;

      .jcl-navbar__link {
        height: $link-height;
        padding: 0 $layout-padding;
        line-height: $link-height;
        color: $primary-color;
        cursor: pointer;
        background: $gray-100;

        &:first-child {
          box-shadow: inset 0 1em 1em -1em $primary-color;
        }

        &:last-child {
          box-shadow: inset 0 -0.5em 0.5em -0.5em $primary-color;
        }

        &:not(:last-child) {
          border-bottom: 1px solid $gray-400;
        }

        &:hover:not(.nav-active) {
          color: $gray-600;
          background: $gray-200;
        }
      }

      .jcl-navbar__link.nav-active {
        color: $gray-100;
        background: $gray-700;
      }
    }
  }
}
</style>
