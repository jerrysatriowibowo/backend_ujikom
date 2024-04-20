const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", router);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_ujikom'
});

const path = require('path');
const imagePath = path.join(__dirname, 'upload', 'images');
app.use('/images/:id', express.static(imagePath));

app.get('/api/v1/profil', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const jwtToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    connection.query('SELECT id, name, firstName, lastName, email FROM users where id = ? ', [jwtToken.id], function (error, result, fields) {
        if (error) throw error;

        if (result.length > 0) {
            res.send({
                success: true,
                message: 'Berhasil ambil profile!',
                data: result
            });
        } else {
            res.send({
                success: false,
                message: 'Gagal ambil profile!'
            });
        }
        res.end();
    });
})

app.listen(process.env.APP_PORT, function(){
    console.log(`Server running on  http://localhost:${process.env.APP_PORT}`);
});

module.exports = app;