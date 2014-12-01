function grayscale(canvas) {
    var newCanvas = cloneCanvas(canvas);
    var newCtx = newCanvas.getContext('2d');
    var img = newCtx.getImageData(0, 0, newCanvas.width, newCanvas.height);
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        img.data[i] = gray;
        img.data[i+1] = gray;
        img.data[i+2] = gray;
    }
    newCtx.putImageData(img, 0, 0);
    return newCanvas.toDataURL();
}

function binarize(canvas) {
    var newCanvas = cloneCanvas(canvas);
    var newCtx = newCanvas.getContext('2d');
    var img = newCtx.getImageData(0, 0, newCanvas.width, newCanvas.height);
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        if((r+g+b)/3 > 128) var bin = 255;
        else var bin = 0;
        img.data[i] = bin;
        img.data[i+1] = bin;
        img.data[i+2] = bin;
    }
    newCtx.putImageData(img, 0, 0);
    return newCanvas.toDataURL();
}

function edgeDetection(canvas){
    var newCanvas = cloneCanvas(canvas);
    var newCtx = newCanvas.getContext('2d');
    var width = newCanvas.width;
    var height = newCanvas.height;
    var img = newCtx.getImageData(0, 0, width, height);
    var data_quant = [];
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        data_quant.push(gray & 0xC0);
    }

    var img_edge = newCtx.createImageData(width, height);
    for(var y = 1; y < height-1; y++){
        for(var x = 1; x < width-1; x++){
            var i = y*width + x;
            var around = (data_quant[i-width]+data_quant[i-1]+data_quant[i+1]+data_quant[i+width])/4;

            if(around < data_quant[i]) var c = 0;
            else var c = 255;
            img_edge.data[i*4] = c;
            img_edge.data[i*4+1] = c;
            img_edge.data[i*4+2] = c;
            img_edge.data[i*4+3] = 255;
        }
    }
    newCtx.putImageData(img_edge, 0, 0);
    return newCanvas.toDataURL();
}

function cloneCanvas(oldCanvas) {
    var newCanvas = document.createElement('canvas');
    var newCtx = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    newCtx.drawImage(oldCanvas, 0, 0);
    return newCanvas;
}

function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}