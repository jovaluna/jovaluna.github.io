function bordes() {
	var AnchoArticle = $('.contenedor > article').outerWidth();
	$('#arriba').css('border-width', '0 0 28px ' + AnchoArticle + 'px');
	$('#abajo').css('border-width', '0 ' + AnchoArticle + 'px' + ' 40px 0');
}

function seccion() {
	var altoSec = ($(window).height() - $('header').height() - $('footer').height());
	$('section').css('height', altoSec);
}

function urlDate(U) {
	var X = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
    X.open('HEAD', U, false);
   	X.send();
  	var dt=X.getResponseHeader("Last-Modified");
  	return dt ? new Date(dt) : new Date(1970,0,0);
}

function handleFile(data) {
	var result = PlistParser.parse(data);
	var version = result.items[0].metadata["bundle-version"];
	var titulo = result.items[0].metadata["title"];
	var url_ipa = result.items[0].assets[0].url;
	var ipa = url_ipa.substr(url_ipa.lastIndexOf('/') + 1);
	var date = urlDate(ipa);
	
	var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
	var fecha = dias[date.getDay()]+" "+date.getDate()+" / "+meses[date.getMonth()]+" / " +date.getFullYear();
	var hora = formatNumber(date.getHours())+ ":" + formatNumber(date.getMinutes())+ ":" + formatNumber(date.getSeconds());
	
	$('#version').text("Versión "+version);
	$('#fecha').text(fecha);
	$('#titulo').text(titulo);
	$('#hora').text(hora);
	//alert(fecha+' - '+hora);
	//alert(titulo+' - '+version);
}

function formatNumber(number){
    if (parseInt(number) < 10) {
        return "0" + number
    }else{
        return number
    }
}

function obtenDatos(){
	var href = $('#descargar').attr('href');
	var url_plist = href.substr(href.lastIndexOf('=') + 1);

	jQuery.get(url_plist,
           handleFile,
           'text');
}

$(document).ready(function(){
	var ancho = $(window).width();
	seccion()
	if (ancho < 581) {
		bordes();
	}
    
    obtenDatos();
});

$(window).resize(function(){
	bordes();
	seccion()
});

