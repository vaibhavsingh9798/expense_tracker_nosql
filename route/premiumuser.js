const express = require('express')
const premimumuserController = require('../controller/premiumuser')
const router = express.Router()

router.get('/showLeaderBoard',premimumuserController.getLeaderBoard)

module.exports = router;