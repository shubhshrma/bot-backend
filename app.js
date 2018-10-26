var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var index = require('./routes/index');
var assignments = require('./routes/assignments');
var exams = require('./routes/exams');
var users = require('./routes/users');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


// var keys = require('./config');

mongoose.connect('mongodb://root:humroothai123@ds249372.mlab.com:49372/bot-backend', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Swagger use
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', );


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Routes
app.use('/', index);
app.use('/assignments', assignments);
app.use('/exams', exams);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});

