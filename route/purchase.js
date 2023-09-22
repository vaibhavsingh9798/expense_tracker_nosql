const express = require('express')
const purchaseController = require('../controller/purchase')
const authonticatemiddleware = require('../middleware/auth')
const router = express.Router()

router.get('/premiummembership',authonticatemiddleware.authonticate,purchaseController.premiumpurchase)

router.post('/updatetransactionstatus',authonticatemiddleware.authonticate,purchaseController.updateTransactionStatus)

router.get('/usercategory',authonticatemiddleware.authonticate,purchaseController.getUserCategory)

module.exports = router;