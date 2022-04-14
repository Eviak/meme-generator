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

    const elAlignLeft = document.querySelector('.align-left')
    elAlignLeft.addEventListener('mousedown', alignFontLeft)

    const elAlignCenter = document.querySelector('.align-center')
    elAlignCenter.addEventListener('mousedown', alignFontCenter)

    const elAlignRight = document.querySelector('.align-right')
    elAlignRight.addEventListener('mousedown', alignFontRight)

    const elStrokeColor = document.querySelector('.stroke-color-input')
    elStrokeColor.addEventListener('input', changeStrokeColor)

    const elColor = document.querySelector('.font-color-input')
    elColor.addEventListener('input', changeTextColor)
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
    const meme = getMeme()
    if (!meme.lines.length) return
    const txt = document.querySelector('.meme-text-editor').value
    updategMemeText(txt)
    renderMeme()
}

function changeLineFocus() {
    updategSelectedLineIdx()
    renderMeme()
}

function addLine() {
    const txt = document.querySelector('.meme-text-editor').value
    updategMemeLines(true, txt)
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

function alignFontLeft() {
    updategMemeTextAlign('left')
    renderMeme()
}

function alignFontCenter() {
    updategMemeTextAlign('center')
    renderMeme()
}

function alignFontRight() {
    updategMemeTextAlign('right')
    renderMeme()
}

function changeStrokeColor() {
    var elColorVal = document.querySelector('.stroke-color-input').value
    updategMemeStrokeColor(elColorVal)
    renderMeme()
}

function changeTextColor() {
    var elColorVal = document.querySelector('.font-color-input').value
    console.log(elColorVal);
    updategMemeTextColor(elColorVal)
    renderMeme()
}

function drawImgAndText() {
    const meme = getMeme()
    var img = new Image();
    img.src = 'imgs/meme-imgs/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            drawText(`${line.txt}`, 270, 270, idx)
        });
    };
}

function drawText(txt, x, y, lineIdx) {
    var meme = getMeme()
    // console.log(meme.lines[lineIdx].strokeColor);
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = meme.lines[lineIdx].align
    gCtx.lineWidth = lineIdx === meme.selectedLineIdx ? 2 : 1
    gCtx.fillStyle = meme.lines[lineIdx].color
    gCtx.font = `${meme.lines[lineIdx].size}px impact`
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = meme.lines[lineIdx].strokeColor
    gCtx.strokeText(txt, x, y)
}