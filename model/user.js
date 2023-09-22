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
       let result = await db.collection('users').insertOne(this)
       return result
    }catch(err){
      console.log('db query',err)
    }
        
     }

    static  async find(email){
       const db = getDb()
       try{
      let cursor = await db.collection('users').find({"email":email})
       let documents = null
      if(cursor)
       documents = cursor.toArray()
      return documents
     }
     catch(err){
      console.error(err)
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