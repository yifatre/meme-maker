'use strict'

const MEME_DB = 'meme'

var gImgs = []//[{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] }, { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] }]
_createImgs()

var gMeme = {
    id: makeId(),
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 20, color: '#ff0000', fill: '#ffffff', x: 0, y: 0, width: 0, font: 'Segoe UI', alignDir: 'left' },
        { txt: 'Me too', size: 40, color: '#1100ff', fill: '#ffffff', x: 50, y: 50, width: 0, font: 'Impact', alignDir: 'left' }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

/*********************************/
function getMeme() {
    return gMeme
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
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

/*********************************/
function setSelectedLineIdx(lineIdx,) {
    gMeme.selectedLineIdx = lineIdx
}

function switchSelectedLine() {
    if (!getNumOfLines()) {
        setSelectedLineIdx(0,)
    } else {
        gMeme.selectedLineIdx--
        if (gMeme.selectedLineIdx < 0) setSelectedLineIdx(getNumOfLines() - 1,)
    }
}

function setMemeImg(imgId,) {
    gMeme.selectedImgId = imgId
}

function setLineText(txt,) {
    if (!getNumOfLines()) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineAlignDir(alignDir,) {
    gMeme.lines[gMeme.selectedLineIdx].alignDir = alignDir
}

function setLineColor(color,) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineFill(color,) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color
}

function setLineSize(dSize,) {
    gMeme.lines[gMeme.selectedLineIdx].size += dSize
}

function setLineWidth(width, lineIdx,) {
    gMeme.lines[lineIdx].width = width
}

function setLineFont(fontName,) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontName
}

function setLineY(dy,) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function setLineX(dx,) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
}

/*********************************/
function addLine() {
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx = getNumOfLines() - 1
}

function removeLine(lineIdx,) {
    if (!getNumOfLines()) return
    return gMeme.lines.splice(lineIdx, 1)
}

function saveMeme(memeImgData) {
    let storedMemes = loadFromStorage(MEME_DB)
    if (!storedMemes) storedMemes = []
    storedMemes.push({ memeInfo: gMeme, memeImgData })
    saveToStorage(MEME_DB, storedMemes)
}

function getSavedMemes() {
    return loadFromStorage(MEME_DB)
}

function getSavedMemeById(memeId) {
    const memes = loadFromStorage(MEME_DB)
    return memes.find(meme => meme.memeInfo.id === memeId)
}

function setCurrentMeme(memeId) {
    gMeme = getSavedMemeById(memeId)
}


function _createMeme(imgId) {
    return {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [_createLine()]
    }
}

function _createLine() {
    return { txt: '', size: 20, color: '#000000', fill: '#ffffff', x: 0, y: 0, width: 0, font: 'Impact', alignDir: 'left' }
}

function _createImgs() {
    for (let i = 1; i <= 18; i++) {
        gImgs.push({ id: i, url: `img/${i}.jpg`, keywords: ['funny', 'cat'] })
    }
}
