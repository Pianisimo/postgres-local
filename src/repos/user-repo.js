const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case')

class UserRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM users;');
        const parsedRows = toCamelCase(rows);
        return parsedRows;
    }

    static async findById(id) {
        const {rows} = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1;
            `, [id]);
        const parsedRows = toCamelCase(rows);
        return parsedRows[0];
    }

    static async insert(username, bio) {
        const {rows} = await pool.query(`
            INSERT INTO users (username, bio)
            VALUES ($1, $2) RETURNING *;
            `, [username, bio]);
        const parsedRows = toCamelCase(rows);
        return parsedRows[0];
    }

    static async update(id, username, bio) {
        const {rows} = await pool.query(`
            UPDATE users
            SET username = $2, bio = $3
            WHERE id = $1 RETURNING *;
            `, [id, username, bio]);
        const parsedRows = toCamelCase(rows);
        return parsedRows[0];
    }

    static async delete(id) {
        const {rows} = await pool.query(`
            DELETE FROM users
            WHERE id = $1 RETURNING *;
            `, [id]);
        const parsedRows = toCamelCase(rows);
        return parsedRows[0];
    }
}

module.exports = UserRepo;
