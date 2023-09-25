 const mongoose = require('mongoose')
 const Schema = mongoose.Schema

 const orderSchema = new Schema({
    orderId:{
        type: String
    },
    status:{
        type : String,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
 })

 module.exports = mongoose.model('Order',orderSchema)

// let {getDb} = require('../util/database')
// class Order{
//     constructor(paymentId,status,userId){
//         this.paymentId = paymentId
//         this.status = status
//         this.userId = userId
//     }

//     async save(){
//        let db = getDb.db()
//        try{
//         let result = db.collection('order').insertOne(this)
//         if(result)
//         return result
//        }catch(error){
//         throw error
//        }

//     }
// }



