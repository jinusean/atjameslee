<template>
  <div>
    <div class="modal-row">
      <h3>eslint-plugin-vue: max-attribtues-per-line</h3>

      <div class="modal-row__content">
        <img
          src="/images/eslint-plugin-vue.png"
          alt="eslint-plugin-vue"/>
        <p>
          Current eslint-plugin-vue standards dictate that attributes must start on a newline if there are more than two
          attributes
          (<span
            class="component"
            v-text="'<parent-component>'"/>). However, elements with one attribute are placed on a single line
            (<span
              class="component"
              v-text="'<child-component>'"/>),
              which is not only counter-intuitive, but also makes it difficult to distinguish the end of one component to
              the start of another.
        </p>
      </div>
    </div>

    <hr>

    <div class="modal-row">
      <h3>eslint-plugin-jinusean: min-attributes-per-line</h3>
      <div class="modal-row__content">
        <img
          src="/images/eslint-plugin-jinusean.png"
          alt="eslint-plugin-jinusean"/>

        <p>
          <i>min-attributes-per-line</i>'s default settings require at least 1 attribute on each line (including the
          opening tag's line). With this rule, there is no contradiction between a single attribute element, and
          multi-attribute elements. Additionally, it is much easier to visually isolate each element.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.modal-row__content {
  grid-template-columns: 24em 1fr;

  img {
    max-height: 10em;
  }

  p {
    line-height: 1.5;
  }
}

hr {
  margin: 2em 0;
}

.component {
  color: darkblue;
}
</style>

<style lang="scss" scoped>
@include media-breakpoint-down(sm) {
  .modal-row__content {
    grid-template-columns: auto;
  }
}
</style>
