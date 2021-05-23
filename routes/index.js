module.exports = function(app, db) {

    var express = require('express');
    var router = express.Router();

    var login = require('./login');
    var warehousing = require('./warehousing');

    router.get('/', (req, res, next) => { res.render('home.ejs') });

    router.get('/monitoring', (req, res, next) => { res.render('monitoring.ejs') });

    router.get('/warehousing', (req, res, next) => { warehousing.init(req, res, db) });

    router.get('/randomTest', (req, res, next) => { warehousing.randomTest(req, res, db) });

    router.get('/registerItem', (req, res, next) => { res.render('registerItem.html') });

    router.post('/registerItem', (req, res, next) => { warehousing.registerItem(req, res, db) });

    router.get('/login', (req, res, next) => { res.render('login.ejs') });

    router.post('/login', (req, res, next) => { login.loginPost(req, res, db) });

    router.get('/join', (req, res, next) => { res.render('join.ejs') });
    router.post('/join', function (req, res, next) {
      var ID = req.body['id'];
      var password = req.body['password'];
      var birthday = req.body['year'] + "-" + req.body['month'] + "-" + req.body['day'];
      var gender = req.body['gender'];
      var email = req.body['email'];
      var phone = req.body['phone'];

      mysqlDB.query('INSERT INTO users VALUES(?,?)', [ID, password, birthday, gender, email, phone], function (err, rows, fields) {
        if (!err) {
          res.send('success');
          console.log("INSERT SUCCESS");
        } else {
          res.send('err : ' + err);
        }
      });
    });

    router.get('/help', (req, res, next) => { res.render('help.ejs') });
    router.get('/mypage', (req, res, next) => { res.render('mypage.ejs') });
    return router;
}
