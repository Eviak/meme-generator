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
    const elMemeText = document.querySelector('.meme-text-editor')
    elMemeText.addEventListener('input', changeMemeText)
    
    const elChangeLine = document.querySelector('.change-line')
    elChangeLine.addEventListener('mousedown', changeLineFocus)

    const elAddLine = document.querySelector('.add-line')
    elAddLine.addEventListener('mousedown', addLine)

    const elRemoveLine = document.querySelector('.remove-line')
    elRemoveLine.addEventListener('mousedown', removeLine)

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

function changeMemeText() {
    const txt = document.querySelector('.meme-text-editor').value
    updategMemeText(txt)
    renderMeme()
}

function changeLineFocus() {
    updategSelectedLineIdx()
    renderMeme()
}

function addLine() {
    updategMemeLines(true)
    renderMeme()
}

function removeLine() {
    updategMemeLines(false)
    renderMeme()
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
    const meme = getMeme()
    var img = new Image();
    img.src = 'imgs/meme-imgs/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            if(meme.selectedLineIdx === idx) drawText(`${line.txt}`, 270, 270, true)
            else drawText(`${line.txt}`, 270, 270, false)
        });
    };
}

function drawText(txt, x, y, isLineSelected) {
    var meme = getMeme()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = isLineSelected ? 2 : 1;
    gCtx.fillStyle = 'white';
    gCtx.font = `${meme.lines[0].size}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}