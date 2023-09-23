const {User} = require('../model/user')
const jwt = require('jsonwebtoken')
const mongdb = require('mongodb')


const authonticate = async (req,res,next) =>{
    try{
  let token =req.headers.authorization
  const payload = jwt.verify(token,process.env.SECRET_KEY)
   let id = new mongdb.ObjectId(payload.userId) 
    let user = await User.findUserbyID(id)
    if(user){
    console.log('user exit ...',user)
    req.user = user[0];
   next()
    }

}catch(err){
  console.log('err',err)
  res.status(401).json({success:false,error:'unauthorized'})
}
}

module.exports ={authonticate}