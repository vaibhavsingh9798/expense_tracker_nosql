const express = require('express')
const expenseController = require('../controller/expense')
const userauthonticate = require('../middleware/auth')

const router = express.Router()

 router.get('/download',userauthonticate.authonticate,expenseController.downloadExpense)

router.get('/allexpenses',userauthonticate.authonticate,expenseController.getExpense)

router.post('/addexpense',userauthonticate.authonticate,expenseController.postExpense)

 router.delete('/deleteexpense/:id',userauthonticate.authonticate,expenseController.deleteExpense)



module.exports = router;