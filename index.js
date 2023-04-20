const express = require('express')
const app = express()
const port = 3000
const multer = require('multer')
var upload = multer()
const statusCodes = require('http-status-codes')
const db = require('./connection')
const response = require('./response')

/**
 * for parsing application/json
 */
app.use(express.json());

/**
 * for parsing application/x-www-form-urlencoded
 */
app.use(express.urlencoded({ extended: true }));

/**
 * for parsing multipart/form-data
 */
app.use(upload.array());
app.use(express.static('public'));

/**
 * routes
 */
app.get('/', (req, res) => {
    db.query("select * from products", (error, results, fieldsInfo) => {
        response(statusCodes.OK, results, 'get all products', res)
    })
})

app.get('/find/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * from products where id=${id}`

    db.query(sql, (err, results) => {
        response(statusCodes.OK, results, 'get detail products', res)
    })
})

app.get('/hello/:name', (req, res) => {
    const name = req.params.name
    const alamat = req.query.alamat
    console.log(`nama ku adalah ${name}, alamat ku ada di ${alamat}`)
    res.status(statusCodes.ACCEPTED).send(`nama ku adalah ${name}, alamat ku ada di ${alamat}`)
})

app.post('/login', (req, res) => {
    const name = req.body.name
    if (name == 'fadli') {
        res.send('login berhasil')
    } else {
        res.send('login gagal')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`)
})