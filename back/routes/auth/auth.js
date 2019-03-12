const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../helpers/db');


router.get('/dobby', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.log('tu nous fais chier !!')
        }
        res.send(results)
    })
})
router.get('/profile/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    connection.query(`SELECT * FROM users WHERE id=${id}`, (err, results) => {
        if (err) {
            console.log('tu nous fais chier !!')
        }
        console.log(results)
        res.send(results)
    })
})


router.post('/profile/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    connection.query(`DELETE FROM users WHERE id=${id}`, (err, results) => {
        if (err) {
            console.log(results, 'res')
            res.status(500).json({ message: err.message })
        } else {
            res.status(200).json({ message: "Ce fichier a bien été supprimé" });
        }
    })
})

router.post('/verif', (req, res) => {
    const { email, password } = req.body


    console.log(`SELECT * FROM users WHERE email = (` + mysql.escape(email) + `) AND password =(` + mysql.escape(password) + `)`);


    connection.query(`SELECT * FROM users WHERE email =(` + mysql.escape(email) + `) AND password =(` + mysql.escape(password) + `)`, 
    (err, results) => {
        console.log('connect query', results)
        if (err) {
            console.log('error request sql')
            res.status(500).json({ "message": 'null' })
        } else {
            console.log('results', results, results.length)
            if (results.length < 1){
                res.status(200).json({'message': 'wrong password'});
            }
            else if (results.email === 'admin@root') {
                res.status(200).json({ "message": 'admin' });
            } else {
                res.status(200).json({ "message": 'user' });
            }
        }

    })
})


router.post('/signup', (req, res) => {

    let formData = req.body
    let email = formData.email
    let password = formData.password
    let name = formData.name
    let lastname = formData.lastname
    let result = `INSERT INTO users (email, password, name, lastname) VALUES (` + mysql.escape(email) + `, ` + mysql.escape(password) + `, ` + mysql.escape(name) + `,` + mysql.escape(lastname) + `)`;

    console.log(formData)
    connection.query(result, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "This user is already registered. PLease logging in !" })
        } else {
            res.status(200).json({ message: "User has been signed up !" });
        }
    })
})

module.exports = router