const {getDb} = require('../util/database')
class Expense{
    constructor(eamount,category,description,email){
       this.eamount = eamount;
       this.category = category
       this.description = description
       this.email = email
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

    static async find(email){
        let db = getDb()
        try{
       let cursor = await db.collection('expense').find({"email":email})
       let documents;
       if(cursor)
       documents = cursor.toArray()
    return documents
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