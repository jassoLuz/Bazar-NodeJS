var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var index = require('./routes/index');
var authRouter = require('./routes/auth');
var users = require('./routes/users');
var productos = require("./routes/productos");
//var login = require('./routes/login');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var app = express();

//app.set('view engine', 'hbs');
//app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
//app.set('view engine', 'handlebars');

//app.engine('handlebars', hbs.engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs',
	                       defaultLayout:'layout',
	                       helpers: require("./public/javascripts/helpers.js").helpers}));
app.set('view engine', '.hbs');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '$Rv@dw1u', resave: true, saveUninitialized: true}));
app.use(flash());
app.use(expressValidator());
app.use('/', index);
app.use('/users', users);
app.use("/productos",productos);

//app.use(express.static('/views/assets'));
app.use("/auth",authRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error();
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  console.log(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;








