var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/controllers.js');

router
	.route('/add')
	.post(ctrl.add);

router
	.route('/admin')
	.get(ctrl.getAdmin);

router
	.route('/admin/urllist')
	.get(ctrl.getUrlList);

router
	.route('/admin/urllist/remove/:id')
	.delete(ctrl.removeUrl);

router
	.route('/:surl')
	.get(ctrl.get);


module.exports = router;