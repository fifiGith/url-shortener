var mongoose = require('mongoose');
var dburl = 'mongodb://localhost/urlshortener';

var db = mongoose.connect(dburl);

mongoose.connection.on('connecting', function() {
	console.log('Connecting database...');
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

require('./urlModel.js');