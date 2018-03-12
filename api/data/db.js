var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/urlshortener';
var retry = null;

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});