const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const saltRounds = 10;


exports.signup = async (req,res)=>{
  const {name,email,password} = req.body;
  console.log('data..',name,email,password)
  try{
 let user = await User.findOne({email:email})
 console.log('user..',user)
 if(!user){
   console.log('not exist..')
     let hasedPassword = await bcrypt.hash(password,saltRounds)
    let  user = new User({name:name,email:email,password:hasedPassword})
    let response = await  user.save()
    console.log('save result', response)
    res.status(201).json(response)
  } 
 else{
 res.status(409).json({success:false,message:"User already exist"})
 }
}
catch(err){
    console.log('er',err)
   throw err 
}
}

let getnrateAccessToken = (id)=>{
   const payload = {userId:id}
  return jwt.sign(payload,process.env.SECRET_KEY)
}

exports.signin = async (req,res)=>{
    const {email,password} = req.body;
    console.log('data>>',email,password)
    try{
     let user = await User.findOne({email:email})
    //  user = user[0]
    console.log('user>>',user)
    if(!user){
      res.status(404).json({success:false,meassage:"The email address you entered isn't connected to an account."}) 
    }
    else{
   const passwordIsMatch = await bcrypt.compare(password,user.password)
   if(passwordIsMatch){
   res.status(200).json({success:true,meassage:"You are successfully logged in",token:getnrateAccessToken(user._id)}) 
   }
   else{
   res.status(401).json({success:false,meassage:"Incorrect password"}) 
   }
    }
   }
  catch(err){
     console.log('er',err)
    res.status(500).json({ error: "Internal Server Error"})
  }
  }

