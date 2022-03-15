const Table = require('./Table.js')
const { mariadb, sqlite } = require('./connections.js')

class DB {
    constructor() {
    this.products = new Table(mariadb, 'products')
    this.messages = new Table(sqlite, 'messages')
    }
}

module.exports = new DB()