'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderMeme()
}

function renderMeme() {
    drawImgAndText()
}

function addListeners() {
    addMemeImagesListeners()
    addLogosListeners()
    addNavListeners()
    addEditorSectionListeners()
}

function addMemeImagesListeners() {
    const elMemeImages = document.querySelectorAll('.meme-image')
    elMemeImages.forEach((elMemeImage) => {
        elMemeImage.addEventListener('mousedown', onMemeImageClick)
    })
}

function addLogosListeners() {
    const elLogos = document.querySelectorAll('.logo')
    elLogos.forEach((elLogo) => {
        elLogo.addEventListener('mousedown', goToGallery)
    })
}

function addNavListeners() {
    const elGalleryBtn = document.querySelector('.gallery-btn')
    elGalleryBtn.addEventListener('mousedown', goToGallery)
}

function addEditorSectionListeners() {
    const elFontSizeInc = document.querySelector('.font-size-inc')
    elFontSizeInc.addEventListener('mousedown', fontSizeInc)

    const elFontSizeDec = document.querySelector('.font-size-dec')
    elFontSizeDec.addEventListener('mousedown', fontSizeDec)
}

function onMemeImageClick() {
    document.querySelector('.gallery-section').style.display = "none"
    document.querySelector('.editor-section').style.display = "flex"
}

function goToGallery() {
    document.querySelector('.gallery-section').style.display = "block"
    document.querySelector('.editor-section').style.display = "none"

}

function fontSizeInc() {
    updategMemeFontSize(true)
    renderMeme()
}

function fontSizeDec() {
    updategMemeFontSize(false)
    renderMeme()
}

function drawImgAndText() {
    var img = new Image();
    img.src = 'imgs/meme-imgs/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText('Lorem ipsum dolor sit amet consectetur adipiscing elit', 270, 270)
    };
}

function drawText(txt, x, y) {
    var meme = getMeme()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    // gCtx.lineWidth = 2;
    gCtx.fillStyle = 'white';
    gCtx.font = `${meme.lines[0].size}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}