var express = require('express');
//var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var bd=require('./bd');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

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


module.exports = router;