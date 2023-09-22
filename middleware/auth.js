const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authonticate = async (req,res,next) =>{
    try{
 
  let token =req.headers.authorization
  const user = jwt.verify(token,process.env.SECRET_KEY)
   //console.log('user>>>',user)
   User.findByPk(user.userId).then(user => {
    // console.log('find user',user)
     req.user = user ;
     next();
   }).catch(err => console.log(err))
}catch(err){
  res.status(401).json({success:false,error:'unauthorized'})
}
}

module.exports ={ authonticate}