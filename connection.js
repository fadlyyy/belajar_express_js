const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "debian-sys-maint",
    password: "HW1OkIRgSfu8nnXa",
    database: "express_js"
})

module.exports = db