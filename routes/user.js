let express = require('express'),
  userController = require('../controller/user');
const router = express.Router();

router.post('/getCode', userController.getCode);
router.post('/bindAccount', userController.bindAccount);
router.post('/saveUserInfo', userController.saveUserInfo);
router.get('/getUserInfo', userController.getUserInfo);

exports.router = router;
