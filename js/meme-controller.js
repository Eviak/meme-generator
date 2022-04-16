'use strict'

var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGalleryImages()
    renderFilterSection()
    addListeners()
}

function renderMeme(imgSrc = getImg()) {
    const meme = getMeme()
    var img = new Image()
    img.src = imgSrc
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            drawText(`${line.txt}`,
            line.pos.x,
            line.pos.y,
            idx)
        })
    }
}

function drawText(txt, x, y, lineIdx) {
    var meme = getMeme()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = meme.lines[lineIdx].align
    gCtx.lineWidth = lineIdx === meme.selectedLineIdx ? 2 : 1
    gCtx.fillStyle = meme.lines[lineIdx].color
    gCtx.font = `${meme.lines[lineIdx].size}px impact`
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = meme.lines[lineIdx].strokeColor
    gCtx.strokeText(txt, x, y)
}

function addListeners() {
    addGalleryImagesListeners()
    addLogosListeners()
    addNavListeners()
    addEditorSectionListeners()
    addCanvasListeners()
}

function addGalleryImagesListeners() {
    const elMemeImages = document.querySelectorAll('.meme-image')
    elMemeImages.forEach((elMemeImage) => {
        elMemeImage.addEventListener('mousedown', onGalleryImageClick)
    })

    addFilterEventListeners()
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

function addCanvasListeners() {
    gElCanvas.addEventListener('mousedown', onCanvasMouseDown)
    gElCanvas.addEventListener('mousemove', onCanvasMouseMove)
    gElCanvas.addEventListener('mouseup', onCanvasMouseUp)
}

function onGalleryImageClick(ev) {
    document.querySelector('.gallery-section').style.display = "none"
    document.querySelector('.editor-section').style.display = "flex"
    // console.log(ev.path);
    setImgSrc(ev.path[0].src)
    renderMeme(ev.path[0].src)
}

function goToGallery() {
    document.querySelector('.gallery-section').style.display = "block"
    document.querySelector('.editor-section').style.display = "none"
    renderGalleryImages()
    addGalleryImagesListeners()

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
    updateMemeTextEditor()
    renderMeme()
}

function addLine() {
    updategMemeLines(true, 'New line')
    updateMemeTextEditor()
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

function onCanvasMouseDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onCanvasMouseMove(ev) {
    const pos = getEvPos(ev)
    const meme = getMeme()
    textCursorHover(pos, meme)
    if (!meme.lines[meme.selectedLineIdx].isDrag) return
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderMeme()
}

function textCursorHover(clickedPos, meme) {
    if (meme.lines[meme.selectedLineIdx].isDrag) return

    const posX = meme.lines[meme.selectedLineIdx].pos.x
    const posY = meme.lines[meme.selectedLineIdx].pos.y
    const textWidth = getSelectedTextWidth()
    const textHeight = getSelectedTextHeight()

    if (
        clickedPos.x - posX < textWidth &&
        clickedPos.x - posX > 0 &&
        (posY - clickedPos.y < textHeight * 0.5 &&
        posY - clickedPos.y > 0 ||
        clickedPos.y - posY > 0 &&
        clickedPos.y - posY < textHeight * 0.5)
    ) {
        document.body.style.cursor = 'pointer'
    } else {
        document.body.style.cursor = 'initial'
    }
}

function onCanvasMouseUp() {
    setTextDrag(false)
    document.body.style.cursor = 'initial'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function getSelectedTextWidth(txt) {
    return gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
}

function updateMemeTextEditor() {
    var meme = getMeme()
    document.querySelector('.meme-text-editor').value = meme.lines[meme.selectedLineIdx].txt
}
