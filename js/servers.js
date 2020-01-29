const getServers = type => {

	app.currentSes = type;

	$('.main-page').hide();
	$('.server-page').show();
	$('.server-box').html('');
	$('.servers').html('');
	$('#serversListType').html(`Lista de servers ${type}`);
	socket.emit('get-servers', type);

}

const createServer = () => {

	let data = {
		creator: currentUserData.nickname,
		address: $('#serverAddress').val(),
		name: $('#serverName').val(),
		description: $('#serverDescription').val(),
		pass: $('#serverPass').val(),
		type: $('#serverType').val(),
		a: app.currentSes
	};

	if(data.address !== '' && data.name !== '' && data.type !== ''){
		socket.emit('create-server', data);
		socket.emit('get-servers', data.a);
		$('.create-server-page').hide();
		$('.server-page').show();

		$('#serverAddress').val('');
		$('#serverName').val('');
		$('#serverDescription').val('');
		$('#serverPass').val('');
		$('#serverType').val('');
	}
	else{
		alert('Prencha os campos obrigatorios "*".')
	}

}

const getServerData = (address, type) => {

	$.get(`${ROOT}/serverinfo?address=${address}&type=${type}`, data => {
		$('.server-box').html(`
			<h3>Nome: ${data.data.name}</h3>
			<h3>Criador: ${data.data.creator}</h3>
			<h3>Endereço: ${data.data.address}</h3>
			<h3>Tipo: ${data.data.type}</h3>
			<h3>Senha: ${data.data.pass}</h3>
			<p>Descrição: ${data.data.description}</p>
		`);
	});

}

const back = () => {
	$('.server-page').hide();
	$('.main-page').show();
}

socket.on('getted-servers', servers => {
	$('.servers').html('');
	for(let i = 0; i < servers.length; i++){
		$('.servers').append(`
			<div onclick="getServerData('${servers[i].address}', '${servers[i].a}')">
				<h2>${servers[i].name}</h2>
				<h3>criado por ${servers[i].creator}</h3>
			</div>
			<hr />
		`);
	}
	//console.log(servers);
});