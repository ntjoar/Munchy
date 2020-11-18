const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('authorization-token');

    //check if token exist
    if(!token) 
        return res.status(401).json({msg: 'No token, authorization denied'});
    try{
        //Verify token
    const decoded= jwt.verify(token, process.env.TOKEN_KEY);
    req.user =decoded;
    next();

    }
    catch(e){
        res.status(400).json({msg :'token is not valid'});
    }
    
}

module.exports =auth;