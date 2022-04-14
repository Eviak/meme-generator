'use strict'
var gSelectedLineIdx = 1
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
        txt: 'I sometimes eat Falafel',
        size: 40,
        align: 'left',
        color: 'red'
    },
]
}

function getMeme() {
    return gMeme
}

function updategMemeText(txt) {
    gMeme.lines[0].txt = txt
}

function updategMemeLines (isAddLine, gSelectedLine) {
    if (isAddLine) {
        gMeme.lines.push({
            txt: 'I LOVE LOVE LOVE FALAFEL',
            size: 40,
            align: 'left',
            color: 'red'
        })
    } else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    }
}

function updategMemeFontSize(isInc) {
    gMeme.lines[0].size = (isInc) ? (gMeme.lines[0].size + 2) : (gMeme.lines[0].size - 2)
}

function updategSelectedLineIdx() {
    if (gMeme.selectedLineIdx < gMeme.lines.length-1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0

    // console.log(gMeme.selectedLineIdx);
}