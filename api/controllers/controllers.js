var mongoose = require('mongoose');
var Url = mongoose.model('Url');

module.exports.add = function(req, res) {

	var url = req.body.url;

	Url.findOne({ url: req.body.url }, function(err, url) {
		if (url) {
			res.send("SAME");
		} else {
			console.log("POST URL", url);
			createUrl();
		}
	});

	var createUrl = function() {
		if (Url.url != req.body.url) {
			Url.create({
				url: String(req.body.url),
				surl: ''
			}, function(err, url) {
				if (err) {
					console.log("Error adding URL");
       				res
       					.status(400)
		     			.json(err);
				} else {
					console.log("URL added", url);
					res
						.status(201)
						.json(url);   
				}
			});
		} else {
			return;
		}
	}
}

module.exports.get = function(req, res) {

	console.log("GET query", req.query.url);
	res.send(req.query.url);
};