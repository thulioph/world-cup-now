$(document).on('ready', function() {
	lightEvent();
	splashScreen();
});


function startAjax() {
	$.ajax({
		url: 'proxy.php',
		dataType: 'JSON',
		beforeSend: function() {
			// var body = document.querySelector('body');
			// body.classList.add('carregando');
		},

		success: function(tabela) {
			var body = document.querySelector('body');
			body.classList.remove('carregando', 'splash');

			// titulo do projeto
				titulo = document.createElement('h1');
				titulo.classList.add('titulo-principal');
				titulo.innerHTML = 'Acompanhe os jogos';
				body.appendChild(titulo);

			var iJogos            = 0,
			tabelaJogos       	  = tabela.jogos,
			tabelaJogosLenght 	  = tabela.jogos.length;

			for(;iJogos < tabelaJogosLenght; iJogos++) {
				var jogo 			= tabelaJogos[iJogos],
				timecasa 	     	= jogo.time_casa.nome,
				placarcasa 	    	= jogo.time_casa.placar,
				fotoCasa 	    	= jogo.time_casa.escudo,
				timevisitante   	= jogo.time_visitante.nome,
				placarvisitante 	= jogo.time_visitante.placar,
				fotoVisitante   	= jogo.time_visitante.escudo,
				horaJogo 	    	= jogo.hora,
				dataJogo	    	= jogo.data,
				status	  	    	= jogo.status,
				url					= jogo.url,
				local				= jogo.localizacao,
				rodada				= jogo.fase_rodada;

				// criando os elementos e inserindo no html
					createStructure();

				// definindo jogos
					h1Casa.innerHTML = timecasa;
					h1Visitante.innerHTML = timevisitante;

				// inserindo o versus
					versus.innerHTML = 'x';

				// definindo escudos
					figureCasa.innerHTML = "<img src='" + fotoCasa + "' />";
					figureVisitante.innerHTML = "<img src='" + fotoVisitante + "' />";

				// definindo hora
					pHora.innerHTML = horaJogo;

				// definindo data
					pData.innerHTML = dataJogo;

				// definindo rodada
					rodadaJogo.innerHTML = rodada;

				// definindo status do jogo
					pStatus.innerHTML = status;

				// definindo placar
					placarCasa.innerHTML = placarcasa;
					placarVisitante.innerHTML = placarvisitante;

				// definindo local de jogo
					localJogo.innerHTML = local;

				// verificando placar perdedor
					if (placarcasa < placarvisitante) {
						div2.classList.add('vencedor');
					}
					if (placarvisitante < placarcasa) {
						div1.classList.add('vencedor');
					}

				// verificando partidas encerradas
					if (status == 'Encerrada') {
						pStatus.classList.add('finalizada');
					} else if (status == 'Criada') {
						pStatus.classList.add('finalizada');
						pStatus.textContent = 'Aguardando o começo';
					} else if (status == 'Em Andamento') {
						pStatus.classList.add('andamento');
					} else if (status == 'Encerrada') {
						pStatus.classList.add('finalizada');
					}

				// altera a fonte de acordo com o nome do time
					if (timecasa.length >= '15') {
						h1Casa.style.fontSize = '1em';
					} else if (timevisitante.length >= '15') {
						h1Visitante.style.fontSize = '1em';
					}

			};
		},

		error: function() {
			var body = document.querySelector('body');
			body.classList.add('error');
		}
	}) //end ajax
}

function createStructure(){

	body = document.querySelector('body');

	// criando elementos
	aside = document.createElement('aside');
	aside.classList.add('partida');

	div1 = document.createElement('div');
	div1.classList.add('selecao', 'selecao1');

	infoTime1 = document.createElement('div');
	infoTime1.classList.add('info-time');

	versus = document.createElement('span');
	versus.classList.add('versus');

	div2 = document.createElement('div');
	div2.classList.add('selecao', 'selecao2');

	infoTime2 = document.createElement('div');
	infoTime2.classList.add('info-time', 'info-time-2');

	h1Casa = document.createElement('h1');
	placarCasa = document.createElement('span');
	h1Casa.classList.add('nome-time');
	placarCasa.classList.add('placar');

	figureCasa = document.createElement('figure');
	figureCasa.classList.add('img-escudo');

	h1Visitante = document.createElement('h1');
	placarVisitante = document.createElement('span');

	h1Visitante.classList.add('nome-time');
	placarVisitante.classList.add('placar');

	figureVisitante = document.createElement('figure');
	figureVisitante.classList.add('img-escudo');

	pHora = document.createElement('p');
	pHora.classList.add('hora-jogo');

	pData = document.createElement('p');
	pData.classList.add('data-jogo');

	pStatus = document.createElement('p');
	pStatus.classList.add('status-jogo');

	rodadaJogo = document.createElement('p');
	rodadaJogo.classList.add('rodada-jogo');

	localJogo = document.createElement('p');
	localJogo.classList.add('local-jogo');

	infoJogo = document.createElement('div');
	infoJogo.classList.add('info-jogo');

	// append dos elementos
	aside.appendChild(pStatus);
	aside.appendChild(div1);
	aside.appendChild(versus);
	aside.appendChild(div2);
	aside.appendChild(infoJogo);

	infoTime1.appendChild(h1Casa);
	infoTime1.appendChild(figureCasa);
	div1.appendChild(infoTime1);
	div1.appendChild(placarCasa);

	div2.appendChild(placarVisitante);
	infoTime2.appendChild(figureVisitante);
	infoTime2.appendChild(h1Visitante);
	div2.appendChild(infoTime2);

	infoJogo.appendChild(pData);
	infoJogo.appendChild(pHora);
	infoJogo.appendChild(localJogo);
	infoJogo.appendChild(rodadaJogo);

	body.appendChild(aside);
}

function notification() {
	var title, notification;

	// suporte a notificação
	if(!('Notification' in window)) {
		console.log('Seu navegador não suporta notificações!');
	}
	// verifica se as permissões de notificação estão habilitadas
	else if(Notification.permission === 'granted') {
		notification = new Notification('World Cup Now', {
			icon: 'https://cdn1.iconfinder.com/data/icons/PLASTICXP/medical/png/128/emergency.png',
			body: 'Gol no jogo!'
		});
	}
	else if(Notification.permission !== 'denied') {
		console.log('A permissão é: ' + Notification.permission);
		Notification.requestPermission(function(permission) {
			// guardando a escolha do usuário
			if (!('permission' in Notification)) {
				Notification.permission = permission;
			}

			// criando notificação
			if(permission === 'granted') {
				notification = new Notification('World Cup Now', {
					icon: 'https://cdn1.iconfinder.com/data/icons/PLASTICXP/medical/png/128/emergency.png',
					body: 'Gol no jogo!'
				});
			}

		});
	}
}

function lightEvent() {
	window.addEventListener('devicelight', function(event) {

		var luzAmbiente = event.value,
			element 	= document.querySelector('body');

		if (luzAmbiente <= 10) {
			element.classList.add('escuro');
		} else {
			element.classList.remove('escuro');
		}
	});
}

function splashScreen() {
	window.setTimeout(startAjax, 5000);
	document.body.classList.add('carregando', 'splash');
}
