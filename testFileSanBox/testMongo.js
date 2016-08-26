//To test mongodb

var express = require('express');
var mongoose = require('mongoose');
var http = require('http');

var app = express();
//set up environment

app.set('port', process.env.PORT||3000);

//
app.get('/', function(req, res){
  res.send('ok');
  res.send('Please use the /api...');
});

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
db = mongoose.connection;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server is listening on port '+ app.get('port'));
});
