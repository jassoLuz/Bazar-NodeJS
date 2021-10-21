var express = require('express');
var router = express.Router();

//res.render('login',{login:results,page:"login"});

router.get('/', function(req, res, next) {
    //res.render('login',{page:"alumnos",ope:"c"});
    res.render('login',{page:"login"});
});

module.exports = router;