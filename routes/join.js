exports.joinPost = function (req, res, db) {
    var ID = req.body['id'];
    var password = req.body['password'];
    var birthday = req.body['year'] + "-" + req.body['month'] + "-" + req.body['day'];
    var gender = req.body['gender'];
    var email = req.body['email'];
    var phone = req.body['phone'];

    db.query('INSERT INTO users VALUES(?,?)', [ID, password, birthday, gender, email, phone], function (err, rows, fields) {
      if (!err) {
        //res.send('join success');
        console.log("INSERT SUCCESS");
        req.session.save(function () {
            res.send("join success");
        });
    } else {
        res.send('err : ' + err);
      }
    });
  }