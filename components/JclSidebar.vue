<template>
  <el-aside>
    <div class="jcl-sidebar">
      <jcl-avatar/>

      <ul
        v-scroll-spy-active
        v-scroll-spy-link
        class="sections-list">
        <li
          v-for="(section, index) in sections"
          :index="`${index}`"
          :key="index"
          class="sections-list-item">
          <a 
            slot="title" 
            href="#">{{ section }}</a>
        </li>
      </ul>
    </div>
  </el-aside>
</template>
<script>
import JclAvatar from './JclAvatar'

export default {
  name: 'JclSidebar',
  components: { JclAvatar },
  computed: {
    sections() {
      return [
        'Home',
        'About',
        'Services',
        'Skills',
        'Experience',
        'Education',
        'Projects',
        'Contact'
      ]
    }
  }
}
</script>
<style lang="scss">
.jcl-sidebar {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: inherit;
  display: flex;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid lightgrey;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  .sections-list {
    border: 0;
    padding: 0;
    list-style: none;

    .sections-list-item {
      text-align: center;
      font-weight: bold;
      margin-bottom: 1rem;

      &.active a {
        color: blue;
      }

      a {
        color: inherit;

        &:hover {
          color: lightblue;
        }
      }

      &:hover,
      &:focus {
        background: none;
      }
    }
  }
}
</style>
