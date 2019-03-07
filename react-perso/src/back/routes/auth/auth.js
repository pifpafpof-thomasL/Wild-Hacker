const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../helpers/db');

app.get('/' ,(req, res) => {
    connection.query('SELECT * FROM users' , (err, results) => {
        if(err){
            console.log('tu nous fais chier !!')
        }
        res.send(results)
    })
})

router.post('/signup', (req, res) => {

    let formData = req.body
    let email = formData.email
    let password = formData.password
    let name = formData.name
    let lastname = formData.lastname
    let result = `INSERT INTO users (email, password, name, lastname) VALUES (`+mysql.escape(email)+`, `+mysql.escape(password)+`, `+mysql.escape(name)+`,`+mysql.escape(lastname)+`)`;

    connection.query(result , (err, results) =>{
        if(err){
            console.log(err)
            res.status(500).end()
        }

    })
})

module.exports = router