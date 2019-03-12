const express = require('express');
const app = express();
const authRouter = require('./routes/auth/auth')
const bodyParser = require('body-parser')
const cors = require('cors');

const port= 5000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

app.use('/auth', authRouter); //où authRouter est issu de l'importation

// app.use(express.static(__dirname  +  '/public'));

app.listen(port, (err) => {
    if(err)
        throw new Error( 'ca ne va pas chez ', err);

    console.log('Serveur is listening on cindy ear\'s' )

})