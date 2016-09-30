//Set up server file and express middleware.
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

//Serve static content for the app from the public directory
app.use(express.static(process.cwd() + '/public'));

//Use bodyParser
app.use(bodyParser.urlencoded({
	extended: false
}));

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//require express-handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//require controllers
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'burgers_db'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});
