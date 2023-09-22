const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const DownloadFile = sequelize.define('downloadfile',{
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    url:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = DownloadFile;