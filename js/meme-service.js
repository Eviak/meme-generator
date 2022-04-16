'use strict'
const gNewLinePos = [{ x: 100, y: 450 }, { x: 100, y: 250 }, { x: 100, y: 50 }]
var gNewLinePosIdx = 0

var gMeme = {
    imgSrc: null,
    selectedLineIdx: 0,
    lines: [{
        isDrag: false,
        pos: { x: 100, y: 50 },
        txt: 'I eat falafel',
        size: 40,
        align: 'left',
        color: 'red'
    }, ]
}

function getMeme() {
    return gMeme
}

function updategMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function updategMemeLines(isAddLine, txt) {
    if (isAddLine) {
        gMeme.lines.push({
            isDrag: false,
            pos: gNewLinePos[gNewLinePosIdx],
            txt,
            size: 40,
            align: 'left',
            color: 'white',
            strokeColor: 'black'

        })
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        gNewLinePosIdx++
    } else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    }
}

function updategMemeFontSize(isInc) {
    gMeme.lines[gMeme.selectedLineIdx].size = (isInc) ? (gMeme.lines[gMeme.selectedLineIdx].size + 2) : (gMeme.lines[gMeme.selectedLineIdx].size - 2)
}

function updategSelectedLineIdx() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
        else gMeme.selectedLineIdx = 0
}

function updategMemeTextAlign(side) {
    gMeme.lines[gMeme.selectedLineIdx].align = side
}

function updategMemeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function updategMemeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function isTextClicked(clickedPos) {
    const posX = gMeme.lines[gMeme.selectedLineIdx].pos.x
    const posY = gMeme.lines[gMeme.selectedLineIdx].pos.y
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
        return true
    } else {
        return false
    }
}

function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function getSelectedTextHeight() {
    const meme = getMeme()
    return meme.lines[meme.selectedLineIdx].size
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy

}

function getImg() {
    return gMeme.imgSrc
}

function setImgSrc(imgSrc) {
    gMeme.imgSrc = imgSrc
}