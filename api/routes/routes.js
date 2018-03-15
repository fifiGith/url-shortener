var express = require('express');
var router = express.Router();

var urlCtrl = require('../controllers/controllers.js');

router
	.route('/add')
	.post(urlCtrl.add);

router
	.route('/:surl')
	.get(urlCtrl.get);

module.exports = router;