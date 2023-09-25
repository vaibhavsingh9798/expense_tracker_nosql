const Razorpay = require('razorpay')
const Order = require('../model/orders')
const User = require('../model/user')

exports.premiumpurchase = async (req,res)=>{
  console.log('id,skey...',process.env.RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET)
 try{
  let rzp = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
  })
  const amount = 2500
 let order = await rzp.orders.create({amount:amount,currency:"INR"})
    console.log('prder details',order.id,'PENDING',req.user._id)
    let purchaseObj =  new Order({orderId:order.id,status:'PENDING',userId:req.user._id})
    let orderDetails = await purchaseObj.save()
    res.status(201).json({order,key_id:rzp.key_id})
 }catch(err){
  console.log('err',err)
  res.status(403).json({message:'something went wrong',error:err})
 }

}

 exports.updateTransactionStatus = async (req,res)=> {
  const {payment_id,order_id,success} = req.body;
  console.log('oid....',order_id,payment_id,success)
 try{
 
 if(success){
 let updatedorder = await Order.findOneAndUpdate({orderId:order_id},{status:"SUCCESSFUL"},{new:true})
 let response = await User.findByIdAndUpdate(req.user._id,{ispremiumuser:true})
  res.status(202).json({success:true,message:'Transaction successful'})
 }
 else{
  console.log('else block ...........')
  let updatedorder = await  Order.findOneAndUpdate({orderId:order_id},{status:"FAILED"})
  let response = await User.findByIdAndUpdate(req.user._id,{ispremiumuser:false})
  res.status(202).json({success:false,message:'Transaction failed'})
 }
 }catch(err){
    res.status(500).json({sucess:false})
 } 
 }  

exports.getUserCategory = async (req,res) =>{
  try{
  res.status(200).json(req.user.ispremiumuser)
  }catch(err){
    res.status(500).json({success:false})
    
  }
}