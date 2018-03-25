var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/controllers.js');
var adminCtrl = require('../controllers/adminController.js');

router
	.route('/add')
	.post(ctrl.add);

// router
// 	.route('/admin')
// 	.get(adminCtrl.authenticate, adminCtrl.getAdmin);

router
	.route('/admin/login')
	// .get(adminCtrl.getLogin)
	.post(adminCtrl.login);

router
	.route('/urllist')
	.get(ctrl.getUrlList);

router
	.route('/urllist/remove/:id')
	.delete(adminCtrl.authenticate, ctrl.removeUrl);

router
	.route('/:surl')
	.get(ctrl.redirect);

module.exports = router;