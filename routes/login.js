exports.loginPost = function(req, res, db) {
	var ID = req.body['id'];
	var password = req.body['password'];
	db.query('select * from users where id=? and password=?',[ID,password], function (err, rows, fields) {
		if (!err) {
			if (rows[0]!=undefined) {
				req.session.uid = ID;
				req.session.isLogined = true;
				req.session.save(function() {
					res.send("login success");
				});
			} else {
				res.send("login error");
			}
		} else {
			res.send('error : ' + err);
		}
	});
}
