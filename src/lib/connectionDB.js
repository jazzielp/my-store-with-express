const mysql = require('mysql2/promise')
const { createPool } = mysql

const pool = createPool({
  host: 'localhost',
  user: 'admin',
  password: 'Toluca.01',
  database: 'db_prueba',
  port: 3306
})

module.exports = pool
