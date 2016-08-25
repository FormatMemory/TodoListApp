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
var Todo = require('./models/Todo');
//var Todo = mongoose.model;

var app      = express();
// configuration =================

var conn = mongoose.createConnection('mongodb://localhost:27017/nTodoListDB');  //connect mongoose to MongoDB
app.use(express.static(__dirname + '/public_front'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

//loading all files in models directory
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js'))
    require(__dirname + '/models/' + filename);
});


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        conn.model('Todo', Todo.Schema).find( function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(todos); // return all todos in JSON format
        });
    });

    //get one todo via it's id
    app.get('/api/todos/:todo_id', function(req,res){
        //use mongoose to get one todo via it's id
        conn.model('Todo', Todo.Schema).findOne(
              {
                _id : req.params.todo_id
              },//filter
              {}//return all except NULL
        ,function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
            // get and return all the todos after you create another
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {
        // create a todo, information comes from AJAX request from frontend
        conn.model('Todo').create({
            content : req.body.content,
            done : req.body.done,
            allert_date: req.body.allert_date,
            lastmotified_date: req.body.lastmotified_date
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
        conn.model('Todo').find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // update todo and send back all todos after creation
    app.post('/api/todos/:todo_id', function(req, res){
      // update a todo, information comes from AJAX request from frontend
      conn.model('Todo').findOneAndUpdate(
        {
          _id : req.params.todo_id
        },
        {
          content : req.body.content,
          done : req.body.done,
          allert_date: req.body.allert_date,
          lastmotified_date: req.body.lastmotified_date
      }, function(err, todo) {
          if (err)
              res.send(err);

          // get and return all the todos after you create another
          conn.model('Todo').find(function(err, todos) {
              if (err)
                  res.send(err)
              res.json(todos);
          });
      });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        conn.model('Todo').remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            conn.model('Todo').find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
