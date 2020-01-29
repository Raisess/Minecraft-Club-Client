const signup = () => {

	let data = {
		email: $('#email').val(),
		nick: $('#nickname').val(),
		pass: $('#pass').val()
	};

	if(data.email !== '' && data.nick !== '' && data.pass !== ''){
		$.post(`${ROOT}/signup?email=${data.email}&nick=${data.nick}&pass=${data.pass}`, null, res => {
			//console.log(res);
			if(res.status === 200){
				alert('Conta criada com sucesso!');
				window.location.reload();
			}
			else{
				alert('Falha ao criar conta, tente novamente mais tarde.');
				window.location.reload();
			}
		});
	}
	else{
		alert('Prencha todos os campos!');
	}
}

const signin = () => {

	let data = {
		nick: $('#nicknameLogin').val(),
		pass: $('#passLogin').val()
	};

	if(data.nick !== '' && data.pass !== ''){
		$.get(`${ROOT}/signin?nick=${data.nick}&pass=${data.pass}`, res => {
			if(res.status === 200){
				currentUserData = res.data;
				//console.log(currentUserData);
				$('.login-page').hide();
				$('.info').html(`version: ${app.version} -- user: ${currentUserData.nickname}`);
				$('.main-page').show();
			}
			if(res.status === 300){
				alert('Senha ou nick incorretos, tente novamente.');
			}
		});
	}
	else{
		alert('Prencha todos os campos!');
		window.location.reload();
	}
}