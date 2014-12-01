var app = app || {};

$(function() {
	initVideo();
	getCamera();

	document.body.onclick = function(){
		getCapture();
	};
});