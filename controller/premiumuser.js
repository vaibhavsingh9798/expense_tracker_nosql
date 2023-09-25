const Expense = require('../model/expense')
const User = require('../model/user')

exports.getLeaderBoard = async (req,res)=>{
    try{
       let users = await User.find() // get only specific col
        res.status(200).json(users)

    }catch(err){
        res.status(500).json({succcess:false})
    } 
}