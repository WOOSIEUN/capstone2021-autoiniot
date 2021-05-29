exports.init = function(req, res, db) {
	if(!req.session.isLogined) res.render('home');
	else res.redirect('mypage');
}
