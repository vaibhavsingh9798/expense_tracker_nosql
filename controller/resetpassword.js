const SibApiV3Sdk = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
//require('dotenv').config()
const Forgotpassword = require('../model/forgotpassword')
const User = require('../model/user')
const saltRound = 10;

exports.postMail = async (req,res) =>{
  try{
    let {uemail} = req.body
   // console.log('mail..',uemail)
    var defaultClient = SibApiV3Sdk.ApiClient.instance; 
    // Configure API key authorization: api-key
   var apiKey = defaultClient.authentications['api-key'];
   apiKey.apiKey = process.env.API_KEY
  
    let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

    const sender = {
      email:'vaibhav.stolution@gmail.com'
    }

    const receivers = [{
      email : `${uemail}`
    }]

     let uuid = uuidv4()
     let user = await User.findOne({where:{email:uemail}})
     //console.log('user..',user)
     if(user){
       let userId = user.id;
       let response = await user.createForgotpassword({id:uuid,userId,isactive:true})
       //console.log('response',response)

      let respemail = await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject:'Reset Password',
        textContent: `http://localhost:3001/password/resetpassword/${uuid}`
       })
       //console.log('repemail',respemail)
     }
    

    }
catch(err){
   res.status(500).json({success:false})
}
}

exports.resetPassword = async (req,res) =>{
  let {uid} = req.params;
 // console.log('uid',uid)
  const passwordFormHTML = `
  <form action="http://localhost:3001/password/updatepassword/${uid}" method="POST">
  <center>
    <h3>Reset Password</h3>
    <label for="passwoed">New password</label>
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Reset Password</button></center>
  </form>
`;
 try{
  let password = await Forgotpassword.findOne({where:{id:uid}})
   if(password && password.isactive){  
      res.send(passwordFormHTML)
   }
  }catch(error){
    res.status(500).json({success:false})
  }

}

exports.updatePassword = async (req,res) => {
   
   let {uid} = req.params;
   let {password} = req.body
  //console.log('update password')

  try{
  let hasedPassword = await bcrypt.hash(password,saltRound)
  let forgotpassword = await Forgotpassword.findOne({where:{id:uid}})
  let user = await User.findOne({where:{id:forgotpassword.userId}})
   if(user && password){
     await user.update({password:hasedPassword})
     await forgotpassword.update({isactive:false})
   }
   const meassage = `<center><h2>Congratulations!</h2>
   <h2>Your password has been changed successfully.</h2></center>`
    res.send(meassage)
  }catch(err){
   res.status(500).json({success:false})
  }

} 