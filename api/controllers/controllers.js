var mongoose = require('mongoose');
var Url = mongoose.model('Url');
var Counter = mongoose.model('Counter');
var hash = require('./hash.js');
var host = 'http://localhost:3000/';

Counter.findOne({ url_count: "url_count"}, function(err, doc) {
	if (!doc) {
		Counter.create({
			url_count: "url_count",
			count: 20000
		});
	} 
});

module.exports.add = function(req, res) {

	Url.findOne({ url: req.body.url }, function(err, url) {
		if (url) {
			res.send(host + url.surl);
		} else {
			console.log("POST URL");
			createUrl();
		}
	});

	var createUrl = function() {
		if (Url.url != req.body.url) {
			Url.create({
				url: String(req.body.url)
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
						.send(host + url.surl);
				}
			});
		} else {
			return;
		}
	}
}

module.exports.get = function(req, res) {

	Url.findOne({ surl: req.params.surl }, function(err, doc) {
		console.log(req.params.surl);
		if (doc) {
			res.redirect(doc.url);
		} else {
			res.redirect('');
		}
	});
};