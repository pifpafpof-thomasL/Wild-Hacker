const express = require('express');
const app = express();
const router = express.Router()




router.post('/signup', (req, res) => {
    console.log(req.body)
    res.send('ok')
})

module.exports = router