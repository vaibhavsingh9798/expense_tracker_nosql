 const getDb = require('../util/database').getDb
 class User{
     constructor(name,email,password){
       this.name = name;
       this.email = email;
       this.password = password
     }
   async  save(){
    try{
      console.log('save...',this)
        const db = getDb()
       let result = await db.collection('expenses').insertOne(this)
       return result
    }catch(err){
      console.log('db query',err)
    }
        
     }
 }

 exports.User = User;

// const User = sequelize.define('user',{
//     id:{
//      type : Sequelize.INTEGER,
//      allowNull: false,
//      autoIncrement:true,
//      primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         unique : true
//     },
//     password:{
//         type : Sequelize.STRING,
//         allowNull: false,
//     },
//      totalexpense:{
//       type : Sequelize.INTEGER,
//       defaultValue:0
//      },
//     ispremiumuser:Sequelize.BOOLEAN

// })

// module.exports = User;