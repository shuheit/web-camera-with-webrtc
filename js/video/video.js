var video, localStream;
var isCapture = true;

function initVideo() {
    video = document.getElementById('myVideo');
    var localStream = null;
}

function getCamera() {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    navigator.getUserMedia( { video: true, audio: false }, 
    	function(stream) {
            localStream = stream;
    		video.src = window.URL.createObjectURL(stream);
    	},
    	function(error) {
            console.log(error);
    	});
};

function getCapture() {
    initCanvas();
    setCapture(myVideo);
};