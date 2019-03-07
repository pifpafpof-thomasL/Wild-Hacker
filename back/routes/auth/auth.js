const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../helpers/db');

router.get('/dobby' ,(req, res) => {
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

    console.log(formData)
    connection.query(result , (err, results) =>{
        if(err){
            console.log(err)
            res.status(500).json({message :  err.message })
        }else{
            res.status(200).json({ message:  "User has been signed up !" });
        }
    })
})

module.exports = router