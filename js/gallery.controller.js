'use strict'

var gIsSavedMemes = false

function renderGallery(word = '') {
    var imgsHTMLs

    const imgs = getImgs(word)
    imgsHTMLs = imgs.map(img => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTMLs.join('')
}

function onSearch(word){
    updateKeywordsMap(word)
    renderGallery()
    renderKeywordsMap()
}

function renderKeywordsMap() {
    const words = getKeywordsMap()
    var wordsHTMLs = ''
    for (const word in words) {
        wordsHTMLs += `<span style="font-size: ${1 + 0.03 * words[word]}rem">${word}</span>`
    }
    document.querySelector('.keywords-map').innerHTML = wordsHTMLs
}

function clearSearch() {
    document.querySelector('#imgFilter').value = ''
    renderGallery()
}

function onImgSelect(imgId) {
    createMeme(imgId)
    goToEditMeme()
}

function getSurpriseMeme() {
    createMeme(getRandomIntInclusive(1, 18), 'Wisdom is acquired when hiding under the bed with a saucepan on your head')
    goToEditMeme()
}

function goToEditMeme() {
    renderMeme()
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.saves').style.display = 'block'
    document.querySelector('.edit').style.display = 'grid'
}


function renderMeme() {
    const meme = getSavedMemes()[0]
    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        renderImg(img)
        if (!meme.lines.length) return
        meme.lines.forEach((line, lineIdx) => { drawText(line, lineIdx) })
        drawLineFrame()
    }
    renderEditor()
}