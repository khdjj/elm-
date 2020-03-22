let express = require('express'),
  businessController = require('../controller/business');
const router = express.Router();

router.post('/v2/getCapha', businessController.getCode);
router.post('/v2/bindAccount', businessController.bindAccount);
router.post('/v2/login', businessController.login);
router.post('/v2/modify/password', businessController.modifyPassword);

exports.router = router;
