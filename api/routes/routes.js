var express = require('express');
var router = express.Router();

var urlCtrl = require('../controllers/controllers.js');

router
	.route('/add')
	.post(urlCtrl.add);

module.exports = router;