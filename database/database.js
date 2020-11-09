class Database {
  constructor() {
    this._db = {}
  }

  find(tableName) {
    tableName = tableName.toLowerCase()

    if (!this._db[tableName]) {
      this._db[tableName] = this._loadTable(tableName)
    }

    return this._db[tableName]
  }

  _loadTable(tableName) {
    const table = require(`./tables/${tableName}.yaml`)
    switch (tableName) {
      case 'projects':
        return table.map((row) => {
          row.tags.sort((a, b) => {
            return a.toLowerCase() < b.toLowerCase() ? -1 : 1
          })
          return row
        })
      default:
        return table
    }
  }

  findProject(projectId) {
    const projects = this.find('projects')
    return projects.find((project) => project.id === projectId)
  }
}

export default new Database()
