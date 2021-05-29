exports.init = function(req, res, db) {
    var id = req.session.uid;
	var sql = "SELECT * FROM users WHERE id = ?;"
	var params=[id]
    var name = ''
	if(!req.session.isLogined) res.status(401).render('unauthorized');
	else {
		db.query(sql,params, (err, result) => {
			if (err) throw err;
			else res.render('mypage.html', {uname: result[0].uname});	
	    });
    }
    
}
