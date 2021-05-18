exports.init = function(req, res, db) {
	db.query("SELECT * FROM warehouse;", (err, result) => {
		if (err) throw err;
		else {
			var items = '';
			for (var i = 0; i < result.length; i++) {
				result[i].received = result[i].received ? '입고완료' : '미입고';
				items += `
					<tr>
						<td>${result[i].rfid}</td>
						<td>${result[i].name}</td>
						<td>${result[i].num}</td>
						<td>${result[i].received}</td>
						<td><button class="checkBtn" onclick="location.href='${result[i].picture}'">확인</button></td>
					</tr>
				  `;
			}
			res.render('warehousing.html', {table_data: items});
		}
	});
}


exports.registerItem = function(req, res, db) {
	var rfid = req.body.rfid.toUpperCase();
	var name = req.body.name;
	var num = req.body.num;
	var received = req.body.status === '입고완료' ? 1 : 0;
	var picture = `./${rfid}.jpg`;
	var id = req.session.uid;

	if(!req.session.isLogined) res.status(401).send("로그인 후 이용해주세요.");
	else {
		db.query(`INSERT INTO warehouse VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}');`, (err, result) => {
			if (err) throw err;
			else res.redirect('warehousing');
		});
	}
}


exports.randomTest = function(req, res, db) {
	var types = ['핸들', '악세사리', '시트', '백미러', '안전벨트', '엔진', '전조등', '타이어', '휠', '스크린', '센서', '방향제'];
	var rfid = Math.random().toString(16).substr(2,8).toUpperCase();
	var name = types[Math.floor(Math.random() * 12)];
	var num = Math.floor(Math.random() * 100) + 1;
	var received = Math.floor(Math.random() * 2);
	var picture = `./${rfid}.jpg`;
	var id = req.session.uid;

	if(!req.session.isLogined) res.status(401).send("로그인 후 이용해주세요.");
	else {
		db.query(`INSERT INTO warehouse VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}');`, (err, result) => {
			if (err) throw err;
			else res.redirect('warehousing');
		});
	}
}
