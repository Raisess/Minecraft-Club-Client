let input = document.querySelector('#chatInput');

input.onfocus = () => {
	input.addEventListener('keydown', e => {
  	switch(e.keyCode) {
  		case 13:
  			socket.emit('msg-send', {
  				author: currentUserData.nickname,
  				local: app.currentSes,
  				color: app.currentColor,
  				content: $('#chatInput').val()
  			});

  			$('#chatInput').val('');
  			break;
  		default:
  			return 0;
  			break;
  	}
	});
}

socket.on('msg-sended', msg => {
	$('.msg').append(`
		<div><b style="color: ${msg.color};">${msg.author} [${msg.local}]</b>:&nbsp<input value="${msg.content}" readonly /></div>
	`);
	$('.msg').scrollTop(999999999);
});