var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next){
  res.render('index.html')
})

router.get('/monitoring', (req, res, next) => { res.render('monitoring.ejs') });

router.get('/warehousing', function (req, res, next){
  res.render('warehousing.html')
})

router.get('/login', function (req, res, next){
  res.render('login.html')
})

router.get('/join', function (req, res, next){
  res.render('join.html')
})

router.get('/help', (req, res, next) => { res.render('help.ejs') });

module.exports = router;
