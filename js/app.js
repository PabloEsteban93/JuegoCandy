
function colorTitulo(selector) {
	$(selector).animate({
		opacity: '0.8',
	}, {
		step:function () {
			$(this).css('color','white');
		},
		queue:true
	},1500)
	.animate({
		opacity: '1'
	},{
		step: function () {
			$(this).css('color','yellow');
		},
		queue: true
	}, 600)
	.delay(1000)
	.animate({
		opacity: '1'
	},{
		step: function () {
			$(this).css('color','white');
		},
		queue: true
	}, 600)
	.animate({
		opacity: '1'
	}, {
		step: function () {
			$(this).css('color','yellow');
			colorTitulo('h1.main-titulo');
		},
		queue: true
	});
}
function obtenerRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function iniciarCandyArrays(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var columnasCandy = $([candyCol1, candyCol2, candyCol3, candyCol4, candyCol5, candyCol6, candyCol7]);

	if(typeof index === 'number') {
		var filaCandy = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index), candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index), candyCol7.eq(index)
		]);
	} else{
		index = '';
	}

	if (arrayType === 'columnas') {
		return columnasCandy;
	} else if(arrayType === 'filas' && index !== '') {
		return filaCandy;
	}
}

function filasCandy(index) {
	var filaCandy = iniciarCandyArrays('filas', index);
	return filaCandy;
}

function columnasCandy(index) {
	var columnaCandy = iniciarCandyArrays('columnas');
	return columnaCandy[index];
}

function validacionColumnas() {

	for(var j = 0; j < 7; j++) {
		var contador = 0;
		var posicionCandy = [];
		var posicionExtraCandy = [];
		var columnaCandy = columnasCandy(j);
		var valorComparacion = columnaCandy.eq(0);
		var gap = false;

		for (var i = 1; i < columnaCandy.length; i++) {
			var srcComparacion = valorComparacion.attr('src');
			var srcCandy = columnaCandy.eq(i).attr('src');

			if(srcComparacion != srcCandy) {
				if (posicionCandy.length >= 3) {
					gap = true;
				} else {
					posicionCandy = [];
				}
				contador = 0;
			} else {
				if ( contador == 0) {
					if(!gap) {
						posicionCandy.push(i - 1);
					} else {
						posicionExtraCandy.push(i - 1);
					}

				}
				if(!gap) {
					posicionCandy.push(i);
				} else {
					posicionExtraCandy.push(i);
				}
				contador += 1;
			}
			valorComparacion = columnaCandy.eq(i);
		}
		if (posicionExtraCandy.length > 2) {
			posicionCandy = $.merge(posicionCandy, posicionExtraCandy);
		}
		if (posicionCandy.length <= 2) {
			posicionCandy = [];
		}
		candyCount = posicionCandy.length;
		if(candyCount >= 3) {
			eliminarColumnaCandy(posicionCandy, columnaCandy);
			colocarScore(candyCount);
		}
	}
}

function eliminarColumnaCandy (posicionCandy, columnaCandy) {
	for(var i = 0; i < posicionCandy.length; i++) {
		columnaCandy.eq(posicionCandy[i]).addClass('delete');
	}
}

function validacionFilas() {
	for(var j = 0; j < 7; j++) {
		var contador = 0;
		var posicionCandy = [];
		var posicionExtraCandy = [];
		var filaCandy = filasCandy(j);
		var valorComparacion = filaCandy[0];
		var gap = false;

		for (var i = 1; i < filaCandy.length; i++) {
			var srcComparacion = valorComparacion.attr('src');
			var srcCandy = filaCandy[i].attr('src');

			if(srcComparacion != srcCandy) {
				if (posicionCandy.length >= 3) {
					gap = true;
				} else {
					posicionCandy = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						posicionCandy.push(i - 1);
					} else {
						posicionExtraCandy.push(i - 1);
					}
				}
				if (!gap) {
					posicionCandy.push(i);
				} else {
					posicionExtraCandy.push(i);
				}
				contador += 1;
			}
			valorComparacion = filaCandy[i];
		}
		if(posicionExtraCandy.length > 2) {
			posicionCandy = $.merge(posicionCandy, posicionExtraCandy);
		}
		if(posicionCandy.length <= 2) {
			posicionCandy = [];
		}
		candyCount = posicionCandy.length;
		if(candyCount >= 3) {
			eliminarFilaCandy(posicionCandy, filaCandy);
			colocarScore(candyCount);

		}
	}
}

function eliminarFilaCandy (posicionCandy, filaCandy) {
	for ( var i = 0; i < posicionCandy.length; i++) {
		filaCandy[posicionCandy[i]].addClass('delete');
	}
}

function colocarScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 30;
			break;
		case 4:
			score += 55;
			break;
		case 5:
			score += 80;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
			break;
	}
	$('#score-text').text(score);
}

function tableroJuego() {
	llenarTablero();
}

function llenarTablero () {
	var top = 7;
	var columna = $('[class^="col-"]');

	columna.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for(var i = 0; i < agrega; i++) {
			var tipoCandy = obtenerRandom(1, 5);
			if(i === 0 && candys < 1) {
				$(this).append('<img src="image/' + tipoCandy + '.png" class="elemento"></img>')
			} else{
				$(this).find('img:eq(0)').before('<img src="image/' + tipoCandy + '.png" class="elemento"></img>');
			}
		}
	});
	agregarEventosCandy();
	iniciarValidaciones();
}

function iniciarValidaciones() {
	validacionColumnas();
	validacionFilas();
	if($('img.delete').length !== 0) {
		eliminarAnimacionCandy();
	}
}

function agregarEventosCandy() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: restrictorMovimientoCandy
	});
	$('img').droppable({
		drop: intercambiarCandy
	});
	permitirEventosCandy();
}

function bloquearEventosCandy() {
	$('img').draggable('disable');
	$('img').droppable('disable');
	
}

function permitirEventosCandy() {
	$('img').draggable('enable');
	$('img').droppable('enable');
	
}


