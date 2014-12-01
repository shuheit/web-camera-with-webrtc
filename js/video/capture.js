var canvas, ctx;

function initCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = 600;
    ctx.canvas.height = 450;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#captures").empty();
}

function setCapture( captured ) {
    ctx.scale(-1,1);
    ctx.drawImage(captured, -600, 0, canvas.width, canvas.height);

    console.log('aaaa');

    $("#captures").append('<img src=\"' + edgeDetection(canvas) + '\" width="200" height="150">');
    $("#captures").append('<img src=\"' + grayscale(canvas) + '\" width="200" height="150">');
    $("#captures").append('<img src=\"' + binarize(canvas) + '\" width="200" height="150">');
}