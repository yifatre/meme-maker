'use strict'

const MEME_DB = 'meme'
var KEYWORDS = ['funny', 'trump', 'dog', 'cute', 'baby']

var gImgs = []
_createImgs()
_createKeywords()

var gMeme = {}
// {
//     id: makeId(),
//     selectedImgId: 4,
//     selectedLineIdx: 0,
//     lines: [
//         { txt: 'I sometimes eat Falafel', size: 20, color: '#ff0000', fill: '#ffffff', x: 0, y: 0, width: 0, font: 'Segoe UI', alignDir: 'left' },
//         { txt: 'Me too', size: 40, color: '#1100ff', fill: '#ffffff', x: 50, y: 50, width: 0, font: 'Impact', alignDir: 'left' }
//     ]
// }




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

function getImgs(word = '') {
    return gImgs.filter(img => img.keywords.filter(keyword => keyword.toLowerCase().includes(word.toLowerCase())).length)
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function getKeywordsMap() {
    return gKeywordSearchCountMap
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

function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineText(txt) {
    if (!getNumOfLines()) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineAlignDir(alignDir) {
    gMeme.lines[gMeme.selectedLineIdx].alignDir = alignDir
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color
}

function setLineSize(dSize) {
    gMeme.lines[gMeme.selectedLineIdx].size += dSize
}

function setLineWidth(width, lineIdx) {
    gMeme.lines[lineIdx].width = width
}

function setLineFont(fontName,) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontName
}

function setLineY(dy) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function setLineX(dx) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
}

function updateKeywordsMap(word) {
    if (!KEYWORDS.includes(word.toLowerCase())) return
    if (!gKeywordSearchCountMap[word]) gKeywordSearchCountMap[word] = 0
    gKeywordSearchCountMap[word]++
}

/*********************************/
function addLine(txt = '') {
    gMeme.lines.push(_createLine(txt))
    gMeme.selectedLineIdx = getNumOfLines() - 1
}

function removeLine(lineIdx) {
    if (!getNumOfLines()) return
    return gMeme.lines.splice(lineIdx, 1)
}

function saveMeme(memeImgData) {
    let storedMemes = loadFromStorage(MEME_DB)
    if (!storedMemes) storedMemes = []
    storedMemes.push(gMeme)
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


function createMeme(imgId, txt = '') {
    gMeme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [_createLine(txt)]
    }
}

function _createLine(txt = '') {
    return { txt, size: 20, color: '#000000', fill: '#ffffff', x: 0, y: 0, width: 0, font: 'Impact', alignDir: 'left', isDrag: false }
}

function _createImgs() {
    gImgs = [
        { id: 1, url: `img/${1}.jpg`, keywords: ['funny', 'trump'] },
        { id: 2, url: `img/${2}.jpg`, keywords: ['funny', 'dog', 'cute'] },
        { id: 3, url: `img/${3}.jpg`, keywords: ['funny', 'dog', 'cute', 'baby'] },
        { id: 4, url: `img/${4}.jpg`, keywords: ['cute', 'cat'] },
        { id: 5, url: `img/${5}.jpg`, keywords: ['funny', 'kid'] },
        { id: 6, url: `img/${6}.jpg`, keywords: ['funny', 'man'] },
        { id: 7, url: `img/${7}.jpg`, keywords: ['funny', 'kid'] },
        { id: 8, url: `img/${8}.jpg`, keywords: ['funny', 'man'] },
        { id: 9, url: `img/${9}.jpg`, keywords: ['funny', 'kid'] },
        { id: 10, url: `img/${10}.jpg`, keywords: ['funny', 'obama'] },
        { id: 11, url: `img/${11}.jpg`, keywords: ['funny', 'kiss'] },
        { id: 12, url: `img/${12}.jpg`, keywords: ['funny', 'man'] },
        { id: 13, url: `img/${13}.jpg`, keywords: ['funny', 'toast'] },
        { id: 14, url: `img/${14}.jpg`, keywords: ['funny', 'sunglasses', 'man'] },
        { id: 15, url: `img/${15}.jpg`, keywords: ['funny', 'simply'] },
        { id: 16, url: `img/${16}.jpg`, keywords: ['funny'] },
        { id: 17, url: `img/${17}.jpg`, keywords: ['funny', 'putin'] },
        { id: 18, url: `img/${18}.jpg`, keywords: ['funny', 'everywhere'] },
        { id: 19, url: `img/${19}.jpg`, keywords: ['funny', 'everywhere'] }
    ]
}

function _createKeywords() {
    gImgs.forEach(img => {
        KEYWORDS = KEYWORDS.concat(img.keywords.filter(word => !KEYWORDS.includes(word.toLowerCase())))
    })
}