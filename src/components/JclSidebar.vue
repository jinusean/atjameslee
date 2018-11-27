<template>
  <el-aside>
    <div class="jcl-sidebar">
      <jcl-avatar/>
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
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid lightgrey;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  .sections-list {
    display: block;
    padding: 0;

    list-style: none;

    border: 0;
    .sections-list-item {
      margin-bottom: 1rem;
      font-weight: bold;
      text-align: center;

      a {
        color: inherit;

        &:hover {
          color: lightblue;
        }
      }

      &.active a {
        color: blue;
      }
      &:hover,
      &:focus {
        background: none;
      }
    }
  }
}
</style>
