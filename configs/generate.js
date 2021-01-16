const { loadYaml } = require('../lib/serverUtils')

<<<<<<< HEAD
export const generateRoutes = () => {
=======
const getProjectRoutes = () => {
>>>>>>> generate project routes
  const projects = loadYaml('../database/tables/projects.yaml')
  return projects.map((project) => `/projects/${project.id}`)
}

<<<<<<< HEAD
export default {
  routes: generateRoutes(),
=======
module.exports.default = {
  routes: getProjectRoutes(),
>>>>>>> generate project routes
}
