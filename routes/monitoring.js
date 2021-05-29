exports.init = function(req, res, db) {
	if(!req.session.isLogined) res.status(401).render('unauthorized');
	else res.render('monitoring');
}
