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

			for(iJogos; iJogos < tabelaJogosLenght; iJogos++) {
				var jogo 			= tabelaJogos[iJogos];
				var	timecasa 	    = jogo.time_casa.nome,
					placarcasa 	    = jogo.time_casa.placar,
					fotoCasa 	    = jogo.time_casa.escudo,
					timevisitante   = jogo.time_visitante.nome,
					placarvisitante = jogo.time_visitante.placar,
					fotoVisitante   = jogo.time_visitante.escudo,
					horaJogo 	    = jogo.hora,
					dataJogo	    = jogo.data,
					status	  	    = jogo.status;

				// console.log("A tabela é: " + tabelaJogos[0].time_casa.nome + " VS " + tabelaJogos[0].time_visitante.nome);
				// console.log("O tamanho é: " + tabelaJogosLenght);
				console.log('O jogo é: ' + timecasa + ' VS ' + timevisitante);
				// console.log('Os dados foram: ' + timecasa, timevisitante, horaJogo, dataJogo, status);

				var body = document.querySelector('body');

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

				// append dos elementos
					aside.appendChild(h1);
					aside.appendChild(figureCasa);
					aside.appendChild(placarCasa);

					aside.appendChild(h2);
					aside.appendChild(figureVisitante);
					aside.appendChild(placarVisitante);

					aside.appendChild(pHora);
					aside.appendChild(pData);
					aside.appendChild(pStatus);

					body.appendChild(aside);

				// definindo jogos
				var casa = document.querySelector('.time-casa');
					casa.innerHTML = timecasa;

				var visitante = document.querySelector('.time-visitante');
					visitante.innerHTML = timevisitante;

				// definindo escudos
				var imgCasa = document.querySelector('.img-casa');
					imgCasa.innerHTML = "<img src='" + fotoCasa + "' />";

				var imgVisitante = document.querySelector('.img-visitante');
					imgVisitante.innerHTML = "<img src='" + fotoVisitante + "' />";

				// definindo hora
				var hora = document.querySelector('.hora-jogo');
					hora.innerHTML = horaJogo;

				// definindo data
				var data = document.querySelector('.data-jogo');
					data.innerHTML = dataJogo;

				// definindo status do jogo
				var statusJogo = document.querySelector('.status-jogo');
					statusJogo.innerHTML = status;

				// definindo placar
				var placar1 = document.querySelector('.placar-casa');
					placar1.innerHTML = placarcasa;

				var placar2 = document.querySelector('.placar-visitante');
					placar2.innerHTML = placarvisitante;


				// verificando placar perdedor
				if(placarcasa < placarvisitante) {
					placar1.classList.add('perdedor');
				}
				if(placarvisitante < placarcasa) {
					placar2.classList.add('perdedor');
				}

				// verificando partidas encerradas
				if (status == 'Encerrada') {
					statusJogo.classList.add('jogo-encerrado');
					var partida = document.querySelector('.partida');
					partida.classList.add('finalizada');
				}
			} // end for
		},

		error: function() {
			var body = document.querySelector('body');
				body.classList.add('error');

				console.log('Error!');
		}
	})
});