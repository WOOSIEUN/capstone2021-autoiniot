$(function() {

    var id = $('#id');
    var pw = $('#pswd1');
    var name = $('#name');
     var birth_yy = $('#yy');
     var birth_mm = $('#mm');
     var birth_dd = $('#dd');
     var gender = $('#gender');
     var email = $('#email');
     var mobile = $('#mobile');
     var button = $('button');
 
    button.click(() => {
       $.post('join', {
          id: $.trim(id.val()),
          password: $.trim(pw.val()),
          uname: $.trim(name.val()),
          year: $.trim(birth_yy.val()),
          month: $.trim(birth_mm.val()),
          day: $.trim(birth_dd.val()),
          gender: $.trim(gender.val()),
          email: $.trim(email.val()),
          phone: $.trim(mobile.val())
       })
       .done((data) => {
          console.log(data);
          if (data === 'join success') {
             location.href = 'login';
          }
          else {
             alert('회원가입에 실패 했습니다.');
          }
       })
       .fail(() => {
          alert('error');
       })
    });
 });