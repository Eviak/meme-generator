'use strict'
var gSelectedLineIdx = 1
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        // {
        // txt: 'Enter',
        // size: 40,
        // align: 'left',
        // color: 'red'
    // }, 
]
}

function getMeme() {
    return gMeme
}

function updategMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function updategMemeLines(isAddLine, txt, gSelectedLine) {
    if (isAddLine) {
        gMeme.lines.push({
            txt,
            size: 40,
            align: 'left',
            color: 'white',
            strokeColor: 'black'
            
        })
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