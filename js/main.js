'use strict'

var gElCanvas
var gCtx

function onInit () {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImg()
}

function drawImg() {
    var img = new Image();
    img.src = 'imgs/meme-imgs/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}