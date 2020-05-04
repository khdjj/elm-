let express = require('express'),
  exportController = require('../controller/export');
const router = express.Router();

router.post('/order', exportController.exportOrderFile);


exports.router = router;
