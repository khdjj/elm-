let express = require('express'),
  userController = require('../controller/user')
const router = express.Router()

router.post('/getCode', userController.getCode)
router.post('/bindAccount', userController.bindAccount)

exports.router = router
