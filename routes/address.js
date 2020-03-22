let express = require('express'),
  addressController = require('../controller/address');
const router = express.Router();

router.post('/v1/saveUser', addressController.saveUserAddress);
router.get('/v1/list', addressController.searchUserAddress);
router.post('/v1/delete', addressController.deleteUserAddress);
router.post('/v1/edit',addressController.editUserAddress)
exports.router = router;
