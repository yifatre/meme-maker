'use strict'

var gImgs = [{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] }, { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] }]

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}



function setLineText(txt, lineIdx = 0) {
    gMeme.lines[lineIdx].txt = txt
}