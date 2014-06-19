$(document).on('ready', function() {
	startAjax();
});

function startAjax() {
	$.ajax({
		url: 'proxy.php',
		dataType: 'JSON',
		beforeSend: function() {
			var body = document.querySelector('body');
			body.classList.add('carregando');

			console.log('Carregando...');
		},

		success: function(tabela) {
			var body = document.querySelector('body');
			body.classList.remove('carregando');

			// titulo do projeto
				titulo = document.createElement('h1');
				titulo.classList.add('topo')
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
				local				= jogo.localizacao;

				// criando os elementos e inserindo no html
					createStructure();

				// definindo jogos
					h1Casa.innerHTML = timecasa;
					h1Visitante.innerHTML = timevisitante;

				// definindo escudos
					figureCasa.innerHTML = "<img src='" + fotoCasa + "' />";
					figureVisitante.innerHTML = "<img src='" + fotoVisitante + "' />";

				// definindo hora
					pHora.innerHTML = horaJogo;

				// definindo data
					pData.innerHTML = dataJogo;

				// definindo status do jogo
					pStatus.innerHTML = status;

				// definindo placar
					placarCasa.innerHTML = placarcasa;
					placarVisitante.innerHTML = placarvisitante;

				// definindo local de jogo
					localJogo.innerHTML = local;

				// inserindo imagem das arenas
					if(local == 'Arena das Dunas') {
						aside.classList.add('arena-das-dunas');
					} else if (local == 'Arena da Baixada') {
						aside.classList.add('arena-da-baixada');
					} else if (local == 'Arena da Amazônia') {
						aside.classList.add('arena-amazonia');
					} else if (local == 'Arena Pantanal') {
						aside.classList.add('arena-pantanal');
					} else if (local == 'Beira-Rio') {
						aside.classList.add('arena-beira-rio');
					} else if (local == 'Arena de São Paulo') {
						aside.classList.add('arena-sao-paulo');
					} else if (local == 'Maracanã') {
						aside.classList.add('maracana');
					} else if (local == 'Mineirão') {
						aside.classList.add('arena-mineirao');
					} else if (local == 'Arena Pernambuco') {
						aside.classList.add('arena-pernambuco');
					} else if (local == 'Mané Garrincha') {
						aside.classList.add('arena-nacional');
					} else if (local == 'Fonte Nova') {
						aside.classList.add('arena-fonte-nova');
					} else if (local == 'Arena Castelão') {
						aside.classList.add('arena-castelao');
					}

				// verificando placar perdedor
					if (placarcasa < placarvisitante) {
						placarVisitante.classList.add('vencedor');
					}
					if (placarvisitante < placarcasa) {
						placarCasa.classList.add('vencedor');
					}

				// verificando partidas encerradas
					if (status == 'Encerrada') {
						aside.classList.add('finalizada');
					} else if (status == 'Criada') {
						pStatus.textContent = 'Aguardando o começo';
					} else if (status == 'Em Andamento') {
						linkJogo.textContent = 'Acompanhe os lances';
						linkJogo.classList.add('ao-vivo');
						linkJogo.setAttribute('href', url);
						linkJogo.setAttribute('target', '_blank');
					} else if (status == 'Encerrada') {
						pStatus.classList.add('finalizada');
					}

			};
		},

		error: function() {
			var body = document.querySelector('body');
			body.classList.add('error');

			console.log('Error!');
		}
	}) //end ajax
}

function createStructure(){

	// console.log('O jogo é: ' + timecasa + ' VS ' + timevisitante);

	body = document.querySelector('body');

	// criando elementos
	aside = document.createElement('aside');
	aside.classList.add('partida');

	div1 = document.createElement('div');
	div1.classList.add('selecao', 'selecao1');

	div2 = document.createElement('div');
	div2.classList.add('selecao', 'selecao2');

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

	linkJogo = document.createElement('a');
	linkJogo.classList.add('link-jogo');

	localJogo = document.createElement('img');
	localJogo.classList.add('local-jogo');

	infoJogo = document.createElement('div');
	infoJogo.classList.add('info-jogo');

	// append dos elementos
	aside.appendChild(div1);
	aside.appendChild(div2);
	aside.appendChild(infoJogo);

	div1.appendChild(figureCasa);
	div1.appendChild(h1Casa);
	div1.appendChild(placarCasa);

	div2.appendChild(figureVisitante);
	div2.appendChild(h1Visitante);
	div2.appendChild(placarVisitante);

	infoJogo.appendChild(pData);
	infoJogo.appendChild(pHora);
	infoJogo.appendChild(pStatus);
	infoJogo.appendChild(linkJogo);
	infoJogo.appendChild(localJogo);

	body.appendChild(aside);
}

function notification() {
	var notification = new Notification(title, options);
	console.log(notification);
}