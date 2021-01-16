<template>
  <div>
    <ul class="flex justify-between">
      <li
        v-for="tab in tabs"
        :key="tab"
        class="cursor-pointer"
        :class="tab !== activeTab && 'bg-gray-400'"
        @click="$emit('change', tab)"
      >
        {{ tab }}
      </li>
    </ul>

    <hr class="my-1" />

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  model: {
    prop: 'activeTab',
    event: 'change',
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: [],
    }
  },
  methods: {
    add(tab) {
      this.tabs.push(tab.name)
    },
    remove(tab) {
      const index = this.tabs.indexOf(tab.name)
      this.tabs.splice(index, 1)
    },
  },
}
</script>

<style scoped></style>
