$(function() {
	generateYears($('#sel-birth'));

	var birthSelect = $('#sel-birth').selectmenu();
	birthSelect.selectmenu('menuWidget').addClass('overflow');

	/*(1) 입력 폼 로직 구현(이메일 처리)*/
	$('#form-register').submit(function(e) {
		e.preventDefault();

		$(this).find('.txt-warning').empty().hide();

		var email = $('#inp-email').val();
		if (!validateEmail(email)) {
			$('#inp-email').next().html('잘못된 형식입니다.').show();
			return;
		}

		var password = $('#inp-password').val();
		if (!validatePassword(password)) {
			$('#inp-password').next().html('대문자와 숫자가 포함된 최소 8자의 문자열이여야 합니다.').show();
			return;
		}

		var confirm = $('#inp-confirm').val();
		if (password !== confirm) {
			$('#inp-confirm').next().html('비밀번호와 일치하지 않습니다.').show();
			return;
		}

		var gender = $('input[name="gender"]:checked').val();
		if (!gender) {
			$('#inp-female').siblings('.txt-warning').html('필수 항목입니다.').show();
			return;
		}
		var birth = $('#sel-birth').val();
		if (!birth) {
			$('#sel-birth').siblings('.txt-warning').html('필수 항목입니다.').show();
			return;
		}

		var accept = $('#inp-accept:checked').val();
		if (!accept) {
			$('#inp-accept').next().next().html('필수 항목입니다.').show();
			return;
		}
		submit(email, password, gender, birth);
	});

	$('#btn-back').click(function() {
		document.location.href = 'index.html';
	});
});

/*(3) 출생년도 목록 생성( jQuery UI 의 selectmenu() 함수 사용)*/
function generateYears($select) {
	for (var i = 1970; i <= 2010; i++) {
		$select.append('<option value="' + i + '">' + i + '</option>');
	}
}

/*(2) 이메일 주소 체크 (이메일 값을 가져와 유효성 체크를 한다.)*/
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatePassword(password){
	var re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	return re.test(password);
}


/*비밀번호 체크(비밀번호 값을 가져와 유효성 체크를 한다)*/
function validatePassword(password) {
	var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	return re.test(password);
}


function submit(email, password, gender, birth) {
	var params = {
		email : email,
		password : password,
		gender : gender,
		birth : birth
	};

	$.post('some-server-url', params, function(r) {
		console.log(r);
	});
}