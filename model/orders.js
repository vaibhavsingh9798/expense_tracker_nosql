let {getDb} = require('../util/database')
class Order{
    constructor(paymentId,status,userId){
        this.paymentId = paymentId
        this.status = status
        this.userId = userId
    }

    async save(){
       let db = getDb.db()
       try{
        let result = db.collection('order').insertOne(this)
        if(result)
        return result
       }catch(error){
        throw error
       }

    }
}



//const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const Order = sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     paymentid:Sequelize.STRING,
//     orderid:Sequelize.STRING,
//     status:Sequelize.STRING


// })

module.exports = Order;