const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../helpers/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser')
const withAuth = require('./middleware')

const mySecret = 'c\'est secret!';

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
    let hash = bcrypt.hashSync(password, 10);


    connection.query(`SELECT * FROM users WHERE email =(` + mysql.escape(email) + `)`,
        (err, results) => {
            console.log('connect query', results[0].password)
            const payload = { email } ;
            const token = jwt.sign(payload, mySecret, { expiresIn: '1h' });
            console.log('token', token)
            if (bcrypt.compareSync(results[0].password, hash)) {
                if (results[0].email === 'admin@root') {
                    res.status(200).json({ "message": 'admin' });
                } else {
                    res.status(200).json({ "message": 'user', token });
                }
            } else {
                console.log('error request sql')
                res.status(500).json({ "message": 'Utilisateur ou Mot de passe incorrect !' })
            }

        })
})


router.post('/signup', (req, res) => {

    const { email, password, name, lastname } = req.body
    let mdp = bcrypt.hashSync(password, 10);
    let result = `INSERT INTO users (email, password, name, lastname) VALUES (` + mysql.escape(email) + `, ` + mysql.escape(mdp) + `, ` + mysql.escape(name) + `,` + mysql.escape(lastname) + `)`;

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