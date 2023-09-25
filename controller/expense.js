const Expense = require('../model/expense')
const mongoose = require('mongoose')
const User = require('../model/user')
 const FileUrl = require('../model/downloadfile')
 const S3services = require('../services/S3services')


exports.downloadExpense = async (req,res) =>{
  try{
  let {_id} = req.user;
  let expenses = await Expense.find({userId:_id})
  console.log('expenses',_id,expenses)
  const stringifiedExpense = JSON.stringify(expenses)
  console.log('strinfifiedExp',stringifiedExpense)
  let filename = `Expense${_id}/${new Date()}.txt`
  let fileURL = await S3services.uploadTos3(stringifiedExpense,filename)
  console.log('fileURL...',fileURL)
  let fileurl = new FileUrl({url:fileURL,userId:_id})
  res.status(200).json({fileURL,success:true})
  }catch(err){
    console.log('dow err',err)
    res.status(500).json({fileURL:'',success:false})
  }
}  
  


// exports.getExpense = async (req,res) =>{
 
//   //  const ITEM_PER_PAGE = +req.query.maxItem || 2
//   //  const page = +req.query.page || 1;
//    //console.log('page...',page)
//    // console.log('req.user>>>>>>>>>>',req.user.ispremiumuser)
//    // console.log('req.user.id1....',req.user.id)
//       try{
//     //  let totalExpense = await Expense.count({where:{userId:req.user.id}})
//     // console.log('count...',totalExpense)
//     let Expenses = await Expense.findAll({offset: (page-1)*ITEM_PER_PAGE,limit:ITEM_PER_PAGE,where:{userId:req.user.id}})
//    // console.log('expenses....',Expenses)
//     res.status(200).json({
//       expense:Expenses,
//       currentPage:page,
//       hasNextPage: ITEM_PER_PAGE*page < totalExpense,
//       nextPage: page + 1,
//       hasPreviousPage: page > 1,
//       previousPage: page -1,
//       lastPage: Math.ceil(totalExpense/ITEM_PER_PAGE)
//     })
//       }catch(err){
//         res.status(500).json({error:err})
//       }
// }

// exports.postExpense = async(req,res) =>{
//   let t = await sequelize.transaction() // transaction();
//   let new_total=0;
//   const userId = req.user.id
//     let {eamount,description,category} = req.body
//  try{
//   let resp = await  Expense.create({eamount,description,category,userId},{transaction:t})
//     let existuser = await User.findOne({where:{id:userId}})
//      let old_total = parseInt(existuser.totalexpense)
//       new_total  = parseInt((old_total*1)+(eamount*1));
//     let updateuser = await User.update({totalexpense:new_total},{where:{id:userId},transaction:t})
//     await t.commit() // check both staisfy then update both db 
//    res.status(201).json(resp)
//  }
//  catch(err){
//   await t.rollback() // roallback mean does't update db
//   res.status(500).json({success:false,meassage:err})
//  }

//}

exports.deleteExpense = async (req,res)=>{
    let expId = req.params.id
    expId = new mongoose.Types.ObjectId(expId)
    console.log('expId',expId)
    try{
    let expenseDetails = await Expense.findById(expId)
    //console.log('expD...',expenseDetails)
    let user = await User.findById(req.user._id)
    let new_total = +user.totalexpense - +expenseDetails.amount
      new_total = new_total<0 ? 0 : new_total
    console.log('total',new_total)
    let updateUser = await User.findByIdAndUpdate(req.user._id,{totalexpense:new_total})
    let resp = await Expense.deleteOne({_id:expId})
    res.status(200).json(resp)
  }catch(error){
    console.log('err',error)
    res.status(500).json({success:false})
}
}


exports.getExpense = async (req,res) =>{
  try{
    let {_id} = req.user 
   console.log('id..',_id)
     let expenses = await Expense.find({userId:_id})
     console.log('expense...',expenses) 
     res.status(200).json({expenses})
  }catch(error){
    res.status(500).json({success:false})
  }
}

exports.postExpense = async(req,res) =>{
    let {eamount,description,category} = req.body
     console.log('req.user',req.user)
     let {_id} = req.user 
    console.log('recived',eamount,description,category,_id)
    try{
      // update total expense
      let user = await User.findById(_id)
      console.log('user',user)
      let newTotal = +eamount + (+user.totalexpense || 0)
      console.log('newTotal',newTotal)
      let updatedTotal = await  User.updateOne({_id:_id},{totalexpense:newTotal})
      console.log('updatedTotal',updatedTotal)
    let expObj = new Expense({amount:eamount,category:category,description:description,userId:_id})
    let expense = await expObj.save()
    res.status(201).json({success:true,expense})
    }catch(error){
      res.status(500).json({success:false})
    }
} 