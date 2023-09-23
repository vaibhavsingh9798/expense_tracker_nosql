const Razorpay = require('razorpay')
const Order = require('../model/orders')

exports.premiumpurchase = async (req,res)=>{
  //console.log('id,skey...',process.env.RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET)
 try{
  let rzp = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
  })
  const amount = 2500
  rzp.orders.create({amount,currency:"INR"},(err,order)=>{
    if(err){
    throw new Error(JSON.stringify(err))
    }
    //console.log('order...',order)
    //sequelize magic function for store info in database
    // req.user.createOrder({orderid:order.id, status:'PENDING'}).then(() =>{  
    //     return res.status(201).json({order,key_id:rzp.key_id})
    // }).catch(err =>{
    //     throw new Error(err)
    // })
    let purchaseObj =  new Order(order.id,'PENDING',req.user._id)
    res.status(201).json({order,key_id:rzp.key_id})
  })
 }catch(err){
  res.status(403).json({message:'something went wrong',error:err})
 }

}

 exports.updateTransactionStatus = async (req,res)=> {
//  const {payment_id,order_id,success} = req.body;
//  //console.log('success>>>>>>>',success)
//  //console.log('oid....',order_id,payment_id)
//  try{
//  let order = await  Order.findOne({where:{orderid:order_id}}) 
//  if(success){
//  let updatedorder = order.update({paymentid:payment_id,status:"SUCCESSFUL"})
//  let response = await req.user.update({ispremiumuser:true})
   req.user.ispremiumuser = true;
  res.status(202).json({success:true,message:'Transaction successful'})
//  }
//  else{
//  // console.log('else block ...........')
//   let updatedorder = order.update({paymentid:payment_id,status:"FAILED"})
//   let response = await req.user.update({ispremiumuser:false})
//   res.status(202).json({success:false,message:'Transaction failed'})
//  }
//  }catch(err){
//     res.status(500).json({sucess:false})
//  } 
 }  

exports.getUserCategory = async (req,res) =>{
  try{
  res.status(200).json(req.user.ispremiumuser)
  }catch(err){
    res.status(500).json({success:false})
    
  }
}