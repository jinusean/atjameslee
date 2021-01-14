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

  _parseTable(tableName, table) {
    switch (tableName) {
      default:
        return table
    }
  }

  _loadTable(tableName) {
    const table = require(`./tables/${tableName}.yaml`)
    return this._parseTable(tableName, table)
  }

  findProject(projectId) {
    const projects = this.find('projects')
    return projects.find((project) => project.id === projectId)
  }
}

export default Database
