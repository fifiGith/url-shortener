var mongoose = require('mongoose');

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
	console.log("urlSchema.pre()");

	var Counter = mongoose.model('Counter');
	Counter.findOneAndUpdate({url_count: "url_count"}, {$inc: {count: 1}}, function(err, counter) {
		console.log("urlSchema.pre()");
		if (err) {
			return next(err);
		}
		console.log("urlSchema.pre()");
		this.num = counter.count;
	});

	next();
});

mongoose.model('Url', urlSchema);
mongoose.model('Counter', counterSchema);