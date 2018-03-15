var mongoose = require('mongoose');
var hash = require('../controllers/hash.js');

var urlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	count: {
		type: Number
	},
	surl: {
		type: String
	}
});

var counterSchema = new mongoose.Schema({
	url_count: String,
	count: Number
});

urlSchema.pre('save', function(next) {
	var Url = this;
	var Counter = mongoose.model('Counter');
	Counter.findOneAndUpdate({url_count: "url_count"}, {$inc: {count: 1}}, function(err, counter) {
		if (err) {
			return next(err);
		}
		Url.count = counter.count;
		Url.surl = hash.encode(Url.count);
		next();
	});
});

mongoose.model('Url', urlSchema);
mongoose.model('Counter', counterSchema);