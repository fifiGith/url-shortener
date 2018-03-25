require('./api/data/db.js')
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes/routes.js');

app.set('port', 3000);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/api', routes);

app.use(express.static(path.join(__dirname, '/public')));

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server is listening on port ' + port);
});