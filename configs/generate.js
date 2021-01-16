const { loadYaml } = require('../lib/serverUtils')

export const generateRoutes = () => {
  const projects = loadYaml('../database/tables/projects.yaml')
  return projects.map((project) => `/projects/${project.id}`)
}

export default {
  routes: generateRoutes(),
}
