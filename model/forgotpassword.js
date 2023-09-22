const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const ForgotPassword = sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    userId:{
      type:Sequelize.INTEGER,
      allowNull:false
    },
    isactive:{
        type: Sequelize.BOOLEAN
    }
})

module.exports = ForgotPassword;