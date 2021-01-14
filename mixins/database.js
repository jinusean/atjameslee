const tables = [
  'experiences',
  'packages',
  'skills',
  'projects',
  'skills',
  'tags',
  'user',
  'interests',
]

const computed = tables.reduce((computed, table) => {
  computed[table] = function () {
    return this.$db.find(table)
  }
  return computed
}, {})

export default { computed }
