const express = require('express')
const passwordController = require('../controller/resetpassword')
const router = express.Router();

router.post('/forgotpassword',passwordController.postMail)

router.get('/resetpassword/:uid',passwordController.resetPassword)

router.post('/updatepassword/:uid',passwordController.updatePassword)

module.exports = router;