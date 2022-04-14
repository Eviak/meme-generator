'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 40,
        align: 'left',
        color: 'red'
    }]
}

function getMeme() {
    return gMeme
}

function updategMemeFontSize(isInc) {
    // if (isInc) {
    //     gMeme.lines[0].size += 2
    // }
    gMeme.lines[0].size = (isInc) ? (gMeme.lines[0].size + 2) : (gMeme.lines[0].size - 2)
}