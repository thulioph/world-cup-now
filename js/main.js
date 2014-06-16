$(document).on('ready', function(){
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

			var iJogos            = 0,
				tabelaJogos       = tabela.jogos,
				tabelaJogosLenght = tabela.jogos.length;

			for(;iJogos < tabelaJogosLenght; iJogos++) {
				var jogo 			= tabelaJogos[iJogos];
				var	timecasa 	    = jogo.time_casa.nome,
					placarcasa 	    = jogo.time_casa.placar,
					fotoCasa 	    = jogo.time_casa.escudo,
					timevisitante   = jogo.time_visitante.nome,
					placarvisitante = jogo.time_visitante.placar,
					fotoVisitante   = jogo.time_visitante.escudo,
					horaJogo 	    = jogo.hora,
					dataJogo	    = jogo.data,
					status	  	    = jogo.status,
					url				= jogo.url,
					local			= jogo.localizacao;

				// console.log('O jogo é: ' + timecasa + ' VS ' + timevisitante);

				body = document.querySelector('body');

				// criando elementos
				aside = document.createElement('aside');
				aside.classList.add('partida');

				h1 = document.createElement('h1');
				placarCasa = document.createElement('span');
				h1.classList.add('time-casa');
				placarCasa.classList.add('placar-casa');

				figureCasa = document.createElement('figure');
				figureCasa.classList.add('img-casa');

				h2 = document.createElement('h2');
				placarVisitante = document.createElement('span');
				h2.classList.add('time-visitante');
				placarVisitante.classList.add('placar-visitante');

				figureVisitante = document.createElement('figure');
				figureVisitante.classList.add('img-visitante');

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

				// append dos elementos
					aside.appendChild(h1);
					aside.appendChild(figureCasa);
					aside.appendChild(placarCasa);

					aside.appendChild(h2);
					aside.appendChild(figureVisitante);
					aside.appendChild(placarVisitante);

					aside.appendChild(pHora);
					aside.appendChild(pData);
					aside.appendChild(linkJogo);
					aside.appendChild(localJogo);
					aside.appendChild(pStatus);

					body.appendChild(aside);

				// definindo jogos
				h1.innerHTML = timecasa;
				h2.innerHTML = timevisitante;

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
					localJogo.setAttribute('src', 'http://blogdobg.com.br/wp-content/uploads/2014/01/IMG_0599.jpg');
				} else if (local == 'Arena da Baixada') {
					localJogo.setAttribute('src', 'http://imagens.globoradio.globo.com/globoradio/fotosGen/4282/428119.jpg');
				} else {
					localJogo.classList.add('sem-foto');
				}

				// definindo url
				if(status == 'Em Andamento') {
					linkJogo.textContent = 'Acompanhe os lances';
					linkJogo.classList.add('ao-vivo');
					linkJogo.setAttribute('href', url);
					linkJogo.setAttribute('target', '_blank');
				}

				// verificando placar perdedor
				if(placarcasa < placarvisitante) {
					placarCasa.classList.add('perdedor');
				}
				if(placarvisitante < placarcasa) {
					placarVisitante.classList.add('perdedor');
				}

				// verificando partidas encerradas
				if (status == 'Encerrada') {
					pStatus.classList.add('jogo-encerrado');
					aside.classList.add('finalizada');
				}
			};// end for
		},

		error: function() {
			var body = document.querySelector('body');
				body.classList.add('error');

				console.log('Error!');
		}
	})
});