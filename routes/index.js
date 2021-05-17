var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => { res.render('home.ejs') });

router.get('/monitoring', (req, res, next) => { res.render('monitoring.ejs') });

router.get('/warehousing', function (req, res, next){
  res.render('warehousing.html')
})

router.get('/login', (req, res, next) => { res.render('login.ejs') });

router.get('/join', (req, res, next) => { res.render('join.ejs') });

router.get('/help', (req, res, next) => { res.render('help.ejs') });

module.exports = router;
