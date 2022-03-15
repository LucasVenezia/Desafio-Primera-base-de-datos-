class Table {
    constructor(db, table) {
        this.db = db
        this.table = table
    }

    async getAll() {
        const items = await this.db.select().from(this.table)
        return items
    }

    async add(data) {
        const result = await this.db(this.table).insert(data)
        return result[0]
    }

    async getById(id) {
        const result = await this.db(this.table).where({ id }).first()
        return result
    }

    async update(id, data) {
        await this.db(this.table).where({ id }).update(data)
    }

    async deleteById(id) {
        await this.db(this.table).where({ id }).del()
    }
}

module.exports = Table