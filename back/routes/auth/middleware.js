const jwt = require('jsonwebtoken');

const mySecret = 'c\' est secret';

const withAuth = function(req, res, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if(!token){
        res.status(401).send('Unautorized: no token provided')
    }else{
        jwt.verify(token, mySecret, (err, decoded) => {
            if(err){
                res.status(401).send('Unautorized; invalid token');
            }else{
                req.email = decoded.email;
                next()
            }
        });
    }
}
module.exports = withAuth;