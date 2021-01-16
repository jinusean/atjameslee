const { loadYaml } = require('../lib/serverUtils')

const getProjectRoutes = () => {
  const projects = loadYaml('../database/tables/projects.yaml')
  return projects.map((project) => `/projects/${project.id}`)
}

module.exports.default = {
  routes: getProjectRoutes(),
}
