const express = require('express')
const expenseController = require('../controller/expense')
const userauthonticate = require('../middleware/auth')

const router = express.Router()

// router.get('/download',userauthonticate.authonticate,expenseController.downloadExpense)

router.get('/allexpenses',expenseController.getExpense)

router.post('/addexpense',expenseController.postExpense)

// router.delete('/deleteexpense/:id',expenseController.deleteExpense)



module.exports = router;