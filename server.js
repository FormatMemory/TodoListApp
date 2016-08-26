//This js file will do followings:
//Configure our application
//Connect to our database
//Create our Mongoose models
//Define routes for our RESTful API
//Define routes for our frontend frontend application
//Set the app to listen on a port so we can view it in our browseor


//Set up
var express  = require('express');
                             // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan   = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require('fs'); //file system library, for loading files(models)
//var Todo = require('./models/Todo');
//var Todo = mongoose.model;

var app      = express();
var router = express.Router();

//app.use('/', router);
// configuration =================

app.use(express.static(__dirname + '/public_front'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(80);
console.log("App listening on port 80");


var todoListAPI = require('./subApp/todoList/todoListAPI');
router.use('/subApp/todoList', todoListAPI);
console.log('todoList API is runing on ../subApp/todoList/api/...');
//loading all files in models directory
/*
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js'))
    require(__dirname + '/models/' + filename);
});
*/
//==============================================================================
//==============================================================================

/* GET home page. */
var home = require('./index');
router.use('/', home);
app.use('/', router);

/*handle ERROR page*/
 // Handle 404
  app.use(function(req, res) {

     res.send('404: Page not Found', 404);
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
     res.send('500: Internal Server Error', 500);
  });

/* end Handle Error page*/

module.exports = app;
