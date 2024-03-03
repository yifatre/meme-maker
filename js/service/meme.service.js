'use strict'

const MEME_DB = 'meme'
var KEYWORDS = ['funny', 'trump', 'dog', 'cute', 'baby']

var gImgs = []
_createImgs()
_createKeywords()

var gMeme = {}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2, 'dog': 8, 'putin': 5 }

/*********************************/
function getMeme() {
    return gMeme
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
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
function setSelectedLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function switchSelectedLine() {
    if (!getNumOfLines()) {
        setSelectedLineIdx(0)
    } else {
        gMeme.selectedLineIdx--
        if (gMeme.selectedLineIdx < 0) setSelectedLineIdx(getNumOfLines() - 1,)
    }
}

function setLineText(txt) {
    if (!getNumOfLines()) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineAlignDir(alignDir) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].alignDir = alignDir
}

function setLineColor(color) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineFill(color) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].fill = color
}

function setLineSize(dSize) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].size += dSize
}

function setLineWidth(width, lineIdx) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[lineIdx].width = width
}

function setLineFont(fontName,) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].font = fontName
}

function setLineY(dy) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function setLineX(dx) {
    if (!getNumOfLines() || getSelectedLine() === -1) return
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

function removeLine() {
    if (!getNumOfLines()) return
    if (gMeme.selectedLineIdx === -1) return
    return gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function saveMeme() {
    const memeToStore = {
        id: gMeme.id,
        selectedImgId: gMeme.selectedImgId,
        selectedLineIdx: gMeme.selectedLineIdx,
        lines: gMeme.lines
    }
    if (gMeme.userImgUrl) memeToStore.userImgUrl = gMeme.userImgUrl
    let storedMemes = loadFromStorage(MEME_DB)
    if (!storedMemes) storedMemes = []
    let memeIdx = storedMemes.findIndex(meme => meme.id === gMeme.id)
    if (memeIdx > -1) storedMemes[memeIdx] = memeToStore
    else storedMemes.push(memeToStore)
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

function addImg(imgUrl) {
    gMeme.userImgUrl = imgUrl
}

function createMeme(imgId = -1, txt = '', id, lines) {
    if (!lines) lines = []
    gMeme = {
        id: id || makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: lines
    }
}

function _createLine(txt = '') {
    return { txt, size: 20, color: '#000000', fill: '#ffffff', x: 0, y: 0, width: 0, font: 'Impact', alignDir: 'left', isDrag: false }
}

function _createImgs() {
    gImgs = [
        { id: 1, url: `img/gallery/${1}.jpg`, keywords: ['funny', 'trump'] },
        { id: 2, url: `img/gallery/${2}.jpg`, keywords: ['funny', 'look', 'cute'] },
        { id: 3, url: `img/gallery/${3}.jpg`, keywords: ['funny', 'dog', 'cute', 'baby'] },
        { id: 4, url: `img/gallery/${4}.jpg`, keywords: ['cute', 'cat'] },
        { id: 5, url: `img/gallery/${5}.jpg`, keywords: ['funny', 'kid'] },
        { id: 6, url: `img/gallery/${6}.jpg`, keywords: ['funny', 'man'] },
        { id: 7, url: `img/gallery/${7}.jpg`, keywords: ['funny', 'kid'] },
        { id: 8, url: `img/gallery/${8}.jpg`, keywords: ['funny', 'man'] },
        { id: 9, url: `img/gallery/${9}.jpg`, keywords: ['funny', 'kid'] },
        { id: 10, url: `img/gallery/${10}.jpg`, keywords: ['funny', 'obama'] },
        { id: 11, url: `img/gallery/${11}.jpg`, keywords: ['funny', 'kiss'] },
        { id: 12, url: `img/gallery/${12}.jpg`, keywords: ['funny', 'man'] },
        { id: 13, url: `img/gallery/${13}.jpg`, keywords: ['funny', 'everywhere'] },
        { id: 14, url: `img/gallery/${14}.jpg`, keywords: ['funny'] },
        { id: 15, url: `img/gallery/${15}.jpg`, keywords: ['funny', 'kids'] },
        { id: 16, url: `img/gallery/${16}.jpg`, keywords: ['funny', 'dog'] },
        { id: 17, url: `img/gallery/${17}.jpg`, keywords: ['toast'] },
        { id: 18, url: `img/gallery/${18}.jpg`, keywords: ['sunglasses', 'man'] },
        { id: 19, url: `img/gallery/${19}.jpg`, keywords: ['funny', 'man'] },
        { id: 20, url: `img/gallery/${20}.jpg`, keywords: ['funny', 'trump'] },
        { id: 21, url: `img/gallery/${21}.jpg`, keywords: ['funny', 'dog', 'cute'] },
        { id: 22, url: `img/gallery/${22}.jpg`, keywords: ['funny', 'simply'] },
        { id: 23, url: `img/gallery/${23}.jpg`, keywords: ['funny', 'oprah'] },
        { id: 24, url: `img/gallery/${24}.jpg`, keywords: ['funny'] },
        { id: 25, url: `img/gallery/${25}.jpg`, keywords: ['funny', 'putin'] }
    ]
}

function _createKeywords() {
    gImgs.forEach(img => {
        KEYWORDS = KEYWORDS.concat(img.keywords.filter(word => !KEYWORDS.includes(word.toLowerCase())))
    })
}