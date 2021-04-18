var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next){
  res.render('index.html')
})

router.get('/main_realtime_warehouse', function (req, res, next){
  res.render('main_realtime_warehouse.html')
})

router.get('/main_warehousing', function (req, res, next){
  res.render('main_warehousing.html')
})

router.get('/login', function (req, res, next){
  res.render('login.html')
})

router.get('/join', function (req, res, next){
  res.render('join.html')
})

router.get('/monitoring', (req, res, next) => { res.render('monitoring.ejs') });
router.get('/help', (req, res, next) => { res.render('help.ejs') });

module.exports = router;
