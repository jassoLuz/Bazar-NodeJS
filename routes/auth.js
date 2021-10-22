var express = require('express');
//var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var bd=require('./bd');
//res.render('login',{login:results,page:"login"});
//var app = express();

//router.use(session({
//	secret: 'secret',
//	resave: true,
//	saveUninitialized: true
//}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

//router.get('/', function(req, res, next) {
  //  //res.render('login',{page:"alumnos",ope:"c"});
    //res.render('login',{page:"login"});
  //  res.sendFile(path.join(__dirname + '/views/login.hbs'));
//});
//display login page
//display login page

//app.get('/', function(request, response) {
//	response.sendFile(path.join(__dirname + '/login.hbs'));
//});
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Login' });
});

router.post('/authentication', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		bd.query('SELECT * FROM login WHERE Username = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/productos');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//display home page
//router.get('/', function(req, res, next) {
  //  if (req.session.loggedin) {
         
    //    res.render('auth/index', {
      //      title:"BazarWebApp",
        //    name: req.session.name,     
       // });
 
    //} else {
 
      //  req.flash('success', 'Please login first!');
       // res.redirect('/auth');
    //}
//});
 
// Logout user
//router.get('/logout', function (req, res) {
  //req.session.destroy();
  //req.flash('success', 'Login Again Here');
  //res.redirect('/login');
//});

module.exports = router;