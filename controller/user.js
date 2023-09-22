const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user').User
//require('dotenv').config()
const saltRounds = 10;


exports.signup = async (req,res)=>{
  const {name,email,password} = req.body;
  console.log('data..',name,email,password)
  try{
  //let user = await User.findOne({where:{email:email}})
 // if(user === null){
    //console.log('not exist..')
     let hasedPassword = await bcrypt.hash(password,saltRounds)
     const user = new User(name,email,hasedPassword)
    let result = await  user.save()
    console.log('save result', result)
   // let response = await User.create({name,email,password:hasedPassword})
   // res.status(201).json(response)
 // } 
 // else{
  //console.log('exist..')
 // res.status(409).json({success:false,message:"User already exist"})
 // }
}
catch(err){
   // console.log('er',e)
   throw err 
}
}

// let getnrateAccessToken = (id)=>{
//   return jwt.sign({userId:id},process.env.SECRET_KEY)
// }
// exports.signin = async (req,res)=>{
//     const {email,password} = req.body;
//    // console.log('data..',email,password)
//     try{
//     let user = await User.findOne({where:{email:email}})
//    // console.log('user...',user)
//     if(user === null ){
//     //  console.log('not exist..')
//       res.status(404).json({success:false,meassage:"The email address you entered isn't connected to an account."}) 
//     }
//     else{
//    // console.log('exist..',user.password)
//     const match = await bcrypt.compare(password,user.password)
//     if(match)
//     res.status(200).json({success:true,meassage:"You are successfully logged in",token:getnrateAccessToken(user.id)}) 
//     else{
//     res.status(401).json({success:false,meassage:"Incorrect password"}) 
//     }

//     }
//   }
//   catch(e){
//     //  console.log('er',e)
//     res.status(500).json({ error: "Internal Server Error"})
//   }
//   }

