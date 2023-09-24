const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const mongoose = require('mongoose')

  const userRoute = require('./route/user')
//  const expenseRoute = require('./route/expense')
//  const purchaseRoute = require('./route/purchase')
const { throws } = require('assert')
const { error } = require('console')
// const premiumuserRoute = require('./route/premiumuser')
// const passwordRoute = require('./route/resetpassword')

const app = express()


// getting data from client side form 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(helmet()) 
app.use(compression())
const accessLogStream =  fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined',{stream: accessLogStream}))

 app.use('/user',userRoute)
//  app.use('/expense',expenseRoute)
//  app.use('/purchase',purchaseRoute)
// app.use('/premium',premiumuserRoute)
// app.use('/password',passwordRoute)


// User.hasMany(Expense,{ foreignKey: 'userId' })
// Expense.belongsTo(User,{ foreignKey: 'userId' })

// User.hasMany(Order)
// Order.belongsTo(User)

// User.hasMany(ForgotPassword)
// ForgotPassword.belongsTo(User)

// User.hasMany(DownloadFile,{foreignKey:'userId'})
// DownloadFile.belongsTo(User,{foreignKey:'userId'})

// sequelize.sync() // {force:true}
// .then(() =>{
//     app.listen(process.env.PORT || 3000,()=>{
//         console.log('server is running on port 3001')
//     })
// })
// .catch(err => console.log(err))

// mongodbConnect(()=>{
//     app.listen(3001,()=>{
//         console.log('Server Started at 3001')
//     })
// })
mongoose.connect(process.env.URI)
.then(()=>{
    app.listen(3001,()=>{
        console.log('Server Started at 3001')
    })
})
.catch(err => console.log(err))
