const Expense = require('../model/expense')
const User = require('../model/user')
const sequelize = require('sequelize')

 // using two time query from two table
// exports.getLeaderBoard = async (req,res)=>{
//     console.log('premium user')
//     let data = {}
//     let users = []
//     try{
//     let expenses = await Expense.findAll()
//     console.log('exp data',expenses)
//     expenses.map(expense => { 
//         console.log('exp...',expense.eamount,expense.userId)
//         if(!data[expense.userId])
//          data[expense.userId] = expense.eamount
//          else
//          data[expense.userId] += expense.eamount
//     })
//     console.log('data',data)
//     for(let key in data){
//         let user = await User.findOne({where:{id:key}})
//         console.log('user',user.name)
//         data[user.name] = data[key]
//         users.push({name:user.name,expense:data[key]})
//     }
//     users.sort((a,b) => b.expense-a.expense)
//     console.log(users)
//     res.status(200).json(users)
// }catch(err){
//     console.log(err)
// }   
// }

// 2nd way using inner join
// exports.getLeaderBoard = async (req,res)=>{
//     let data = []
//     try{
// let userWithExpense = await User.findAll({include:Expense,})
  
// Access the result
//  userWithExpense.forEach((user) =>{
//       console.log('user',user.name)
//        user.expenses.forEach((expense) =>{
//          console.log('expense',expense.eamount)
//          data.push({name:user.name,texpense:expense.eamount})
//        })
//  })
//  data.sort((a,b) => b.texpense-a.texpense)
//  console.log(data)
//  res.status(200).json(data)
//     }catch(err){
//       console.log(err)
//     }
// }

// use group order and inner join also
// exports.getLeaderBoard = async (req,res)=>{
//     try{
//        let users = await User.findAll({
//         attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.eamount')),'total_cost']],
//         include : [
//             {
//                 model : Expense,
//                 attributes:[]
//             }
//         ],
//         group:['user.id'],
//         order:[['total_cost','DESC']]  // sorted des order

//        })
//        res.status(200).json(users)
//     }catch(err){
//      console.log(err)
//     }
// }

exports.getLeaderBoard = async (req,res)=>{
    try{
       let users = await User.findAll({attributes:['name','totalexpense'],order:[['totalexpense','DESC']]}) // get only specific col
        res.status(200).json(users)

    }catch(err){
        res.status(500).json({succcess:false})
    }

    
}