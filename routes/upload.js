let express = require('express'),
  upload = require('../service/getpath');
const router = express.Router();

router.post('/img', upload);

exports.router = router;
