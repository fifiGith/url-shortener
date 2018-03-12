require('./api/data/db.js')
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('port', 3000);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server is listening on port ' + port);
});