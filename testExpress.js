//To test Express

var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.status(200).send('Express is running...');
});
var server = app.listen(7070, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});
module.exports = server;

