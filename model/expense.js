const mongoose = require('mongoose');
const Schema = mongoose.Schema

const expenseSchema = new Schema({
   amount:{
    type: Number,
    require:true
   },
   category:{
    type: String,
    require: true
   },
   description:{
    type:String,
    require:true
   },
   userId:{
    type: mongoose.Schema.ObjectId,
    ref : 'User'
   },
})

module.exports = mongoose.model('Expense',expenseSchema)

// const {getDb} = require('../util/database')
// class Expense{
//     constructor(eamount,category,description,userId){
//        this.eamount = eamount;
//        this.category = category
//        this.description = description
//        this.userId = userId;
//     }

//     async save(){
//       let db = getDb()
//       try{
//      let result = await db.collection('expense').insertOne(this)
//      return result
//       }catch(err){
//         throw err
//       }
      
//     }

//     static async find(userId){
//         let db = getDb()
//         try{
//        let cursor = await db.collection('expense').find({"userId":userId})
//        let documents;
//        if(cursor)
//        documents = cursor.toArray()
//     return documents
//         }catch(err){
//             throw err;
//         }
//     }

//     static async delete(expId){
//       let db = getDb()
//       try{
//      let result = await db.collection('expense').deleteOne({"_id":expId})
//      if(result)
//        return result
//       }catch(err){
//           throw err;
//       }
//     }
// }

//exports.Expense = Expense;









