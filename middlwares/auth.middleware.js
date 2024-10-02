const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{

   try {
    const token = req.headers.authorization.split(" ")[1]
    const  decoded = jwt.verify(token, process.env.SECRETKEY);
   if(decoded){
    req.userId = decoded.userId
    req.role= decoded.role
    next()
   }
   } catch (error) {
    res.status(401).json({msg:  "Unauthorised" , error})
   }
}

module.exports = authMiddleware