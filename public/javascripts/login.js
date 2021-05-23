$(function() {

	var id = $('#id');
	var pw = $('#pswd1');
	var button = $('button');

	button.click(() => {
		$.post('login', {
			id: $.trim(id.val()),
			password: $.trim(pw.val())
		})
		.done((data) => {
			console.log(data);
			if (data === 'login success') {
				location.href = 'warehousing';
			}
			else {
				alert('아이디 또는 비밀번호가 맞지 않습니다.');
			}
		})
		.fail(() => {
			alert('error');
		})
	});
});
