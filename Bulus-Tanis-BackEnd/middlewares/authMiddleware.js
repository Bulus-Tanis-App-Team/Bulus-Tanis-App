const jwt = require('jsonwebtoken');
const {secureKey} = require('../app.config');

module.exports=(req,res,next)=>{
    try {               
        const token = req.body.token; 
        const decoded = jwt.verify(token,secureKey);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).send({message:"Auth Failed"})
    }
}