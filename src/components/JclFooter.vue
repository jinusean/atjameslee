<template>
  <div class="jcl-footer">
    <div class="jcl-footer__container">
      <a
        class="jcl-footer__email"
        href="mailto:atjameslee@gmail.com"
        alt="email me">atjameslee@gmail.com</a>
      <ul class="contact-links">
        <li
          v-for="(value, key) in links"
          :key="key"
          class="contact-links__link">
          <a
            :href="value"
            target="_blank">
            <img
              :src="require(`~/assets/logos/${key}.svg`)"
              :alt="key">
          </a>
          <!--<span class="contact-links__link__text">-->
          <!--{{ key }}-->
          <!--</span>-->
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
        // gmail: 'mailto:atjameslee@gmail.com',
        gitlab: 'https://gitlab.com/users/jinusean/projects',
        instagram: 'https://instagram.com/atjameslee'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jcl-footer {
  overflow: hidden;
  background: $gray-100;

  .jcl-footer__container {
    @include layout-size();

    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 1em 2em;
  }

  .jcl-footer__email {
    margin: 1em 0;
    font-weight: bold;
  }

  .contact-links {
    display: flex;
    justify-content: center;
    margin: 0;

    .contact-links__link {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: $transition;

      &:not(:last-child) {
        margin-right: 1em;
      }

      img {
        width: 2em;
        height: 2em;
      }

      .contact-links__link__text {
        position: absolute;
        bottom: -1em;
        //color: $link-color;
        text-transform: capitalize;
        opacity: 0;
        transition: $transition;
      }
    }

    .contact-links__link:hover {
      a {
        opacity: 0.5;
      }

      .contact-links__link__text {
        opacity: 1;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .jcl-footer__container {
      flex-direction: column;

      > * {
        margin: 1em;
      }
    }

  }
}
</style>
