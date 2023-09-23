const {getDb} = require('../util/database')
class Expense{
    constructor(eamount,category,description,userId){
       this.eamount = eamount;
       this.category = category
       this.description = description
       this.userId = userId;
    }

    async save(){
      let db = getDb()
      try{
     let result = await db.collection('expense').insertOne(this)
     return result
      }catch(err){
        throw err
      }
      
    }

    static async find(userId){
        let db = getDb()
        try{
       let cursor = await db.collection('expense').find({"userId":userId})
       let documents;
       if(cursor)
       documents = cursor.toArray()
    return documents
        }catch(err){
            throw err;
        }
    }

    static async delete(expId){
      let db = getDb()
      try{
     let result = await db.collection('expense').deleteOne({"_id":expId})
     if(result)
       return result
      }catch(err){
          throw err;
      }
    }
}

exports.Expense = Expense;









// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const Expense = sequelize.define('expense',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     eamount:{
//         type: Sequelize.INTEGER,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Expense;