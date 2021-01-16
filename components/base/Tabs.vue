<template>
  <div>
    <ul class="flex flex-row" v-bind="$attrs" :class="tabsClass">
      <li
        v-for="tab in tabs"
        :key="tab"
        style="margin-bottom: -1px"
        class="p-4 w-32 text-center"
        :class="
          tab === activeTab
            ? 'text-black font-boldest border-b-4 border-gray-600'
            : 'cursor-pointer hover:border-b-2 hover:border-gray-200'
        "
        @click="$emit('change', tab)"
      >
        {{ tab }}
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  inheritAttrs: false,
  model: {
    prop: 'activeTab',
    event: 'change',
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
    tabsClass: {
      type: String,
      default: 'mb-8',
    },
  },
  data() {
    return {
      tabs: [],
    }
  },
  methods: {
    add(name) {
      this.tabs.push(name)
    },
    remove(name) {
      const index = this.tabs.indexOf(name)
      this.tabs.splice(index, 1)
    },
  },
}
</script>

<style scoped></style>
