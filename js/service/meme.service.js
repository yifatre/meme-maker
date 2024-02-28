'use strict'

var gImgs = []//[{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] }, { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] }]
_createImgs()

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 20, color: '#ff0000', fill: '#ffffff', x: 0, y: 0, width: 0, font:'Segoe UI' },
        { txt: 'Me too', size: 40, color: '#1100ff', fill: '#ffffff', x: 50, y: 50, width: 0, font:'Impact' }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getLine(lineIdx) {
    return gMeme.lines[lineIdx]
}

function getNumOfLines() {
    return gMeme.lines.length
}

function getImgs() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineText(txt, lineIdx = 0) {
    gMeme.lines[lineIdx].txt = txt
}

function setLineColor(color, lineIdx = 0) {
    gMeme.lines[lineIdx].color = color
}

function setLineFill(color, lineIdx = 0) {
    gMeme.lines[lineIdx].fill = color
}

function setLineSize(dSize, lineIdx = 0) {
    gMeme.lines[lineIdx].size += dSize
}

function setLineWidth(width, lineIdx) {
    gMeme.lines[lineIdx].width = width
}

function setLineFont(fontName, lineIdx){
    gMeme.lines[lineIdx].font = fontName
}

function addLine() {
    return gMeme.lines.push({ txt: '', size: 20, color: '#000000', fill: '#ffffff', x: 0, y: 0 })
}


function _createImgs() {
    for (let i = 1; i <= 18; i++) {
        gImgs.push({ id: i, url: `img/${i}.jpg`, keywords: ['funny', 'cat'] })
    }
}
