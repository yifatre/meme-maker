'use strict'

var gIsSavedMemes = false

function renderGallery(word = '') {
    var imgsHTMLs

    const imgs = getImgs(word)
    imgsHTMLs = imgs.map(img => `<div class="img-holder"><img src="${img.url}" alt="" onclick="onImgSelect(${img.id})"></div>`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTMLs.join('')

    document.querySelector('.msg').classList.add('hide')
}

function onSearch(word) {
    updateKeywordsMap(word)
    renderGallery(word)
    renderKeywordsMap()
}

function onClickKeyword(word) {
    document.querySelector('#img-filter').value = word
    onSearch(word)
}

function renderKeywordsMap() {
    const words = getKeywordsMap()
    var wordsHTMLs = ''
    for (const word in words) {
        wordsHTMLs += `<span onclick="onClickKeyword('${word}')" style="font-size: ${1 + 0.03 * words[word]}rem">${word}</span>`
    }
    document.querySelector('.keywords-map').innerHTML = wordsHTMLs
}

function clearSearch() {
    document.querySelector('#img-filter').value = ''
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

function editMeme(memeId) {
    const meme = getSavedMemes().find(meme => meme.gMeme.id === memeId)
    createMeme(meme.gMeme.selectedImgId, '', memeId, meme.gMeme.lines)
    goToEditMeme()
}

function renderSavedMemes() {
    const memes = getSavedMemes()
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = ''
    if (!memes) {
        const elMsg = document.querySelector('.msg')
        elMsg.innerHTML = '<h2>No saved memes yet 😫</h2>'
        elMsg.classList.remove('hide')
        return
    }

    memes.forEach((meme, i) => {
        renderSavedMeme(meme.gMeme.id, meme.memeImgData, i, elGallery)
    });

}

function renderSavedMeme(memeId, memeImgData, i, elGallery) {
    const canvasStr = `<div class="saved-canvas-container div_${i}"><canvas class="saved-canvas saved_${i}" height="150" width="150" onclick="editMeme('${memeId}')"></canvas><div>`
    elGallery.innerHTML += canvasStr
    const elCanvas = document.querySelector(`canvas.saved_${i}`)
    const ctx = elCanvas.getContext('2d')
    const img = new Image()
    img.src = memeImgData
    img.onload = () => {
        elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    }
}