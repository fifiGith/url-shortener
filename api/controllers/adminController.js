var mongoose = require('mongoose');
var path = require('path');
var Admin = mongoose.model('Admin');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const adminPlaintextPassword = 'admin12345';

Admin.findOne({ username: 'admin'}, function(err, admin) {
	if (!admin) {
		Admin.create({
			username: 'admin',
			password: bcrypt.hashSync(adminPlaintextPassword, bcrypt.genSaltSync(saltRounds))
		}, function(err, admin) {
			if (err) {
				console.log(err);
			} else {
				console.log('Admin created');
				usernameAndPassword(admin);
			}
		});
	} else if (admin) {
		console.log('Admin found');
		usernameAndPassword(admin);
	} else {
		console.log(err);
	}
});

var usernameAndPassword = function(admin) {
	console.log("Admin's username:", admin.username);
	console.log("Admin's password:", adminPlaintextPassword);
	console.log("Admin's panel: /admin");
}

module.exports.getAdmin = function(req, res) {

	res.sendFile(path.join(__dirname, '../../public', 'admin.html'));
};

module.exports.getLogin = function(req, res) {

	res.sendFile(path.join(__dirname, '../../public', 'auth.html'));	
};

module.exports.login = function(req, res) {
	console.log('logging in');
	var username = req.body.username;
	var password = req.body.password;

	Admin.findOne({ username: username }, function(err, admin) {
		if (err) {
			console.log(err);
		} else {
			if (bcrypt.compareSync(password, admin.password)) {
				console.log('Admin logged in');
				var token = jwt.sign({ username: admin.username }, 'nimda', { expiresIn: 3600 });
				res.status(200).json({ success: true, token: token });
			} else {
				res.status(401).json('Unauthorized');
			}
		}
	});
};

module.exports.authenticate = function(req, res, next) {
	var headerExists = req.headers.authorization;
	if (headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 'nimda', function(err, decoded) {
			if (err) {
				console.log(error);
				res.status(401).json('Unauthorized');
			} else {
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res.redirect('admin/login');
	}
};