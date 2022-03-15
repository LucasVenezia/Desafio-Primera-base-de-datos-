const knex = require('knex')

const mariadb = knex({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce',
    }
})

const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: './src/db/ecommerce.sqlite'
    },
    useNullAsDefault: true
})

module.exports = {
    mariadb,
    sqlite
}
