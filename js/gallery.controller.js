'use strict'

function renderGallery(word = '') {
    var imgsHTMLs

    const imgs = getImgs(word)
    imgsHTMLs = imgs.map(img => `<div class="img-holder"><img src="${img.url}" alt="" onclick="onImgSelect(${img.id})"></div>`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTMLs.join('')

    document.querySelector('.msg-no-saved').classList.add('hide')
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
        wordsHTMLs += `<span onclick="onClickKeyword('${word}')" style="font-size: ${0.8 + 0.06 * words[word]}rem">${word}</span>`
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
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.saves').classList.remove('hide')
    document.querySelector('.edit').classList.remove('hide')
}

function editMeme(memeId) {
    const meme = getSavedMemes().find(meme => meme.id === memeId)
    createMeme(meme.selectedImgId, '', memeId, meme.lines)
    if (meme.userImgUrl) addImg(meme.userImgUrl)
    goToEditMeme()
}

function renderSavedMemes() {
    const memes = getSavedMemes()
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = ''

    if (!memes) {
        const elMsg = document.querySelector('.msg-no-saved')
        elMsg.innerHTML = '<h2>No saved memes yet 😫</h2>'
        elMsg.classList.remove('hide')
        return
    }

    memes.forEach((meme, i) => {
        renderSavedMeme(meme, i, elGallery)
    });

}

function renderSavedMeme(meme, i, elGallery) {
    const canvasStr = `<div class="img-holder div_${i}"><canvas width="200" height="200" class="saved_${i}" onclick="editMeme('${meme.id}')"></div>`
    elGallery.innerHTML += canvasStr
    const img = new Image()
    if (meme.userImgUrl) img.src = meme.userImgUrl
    else img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        const elCanvas = document.querySelector(`.saved_${i}`)
        const ctx = elCanvas.getContext('2d')
        elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
        meme.lines.forEach((line, i) => drawText(line, i, ctx, elCanvas.width / 400))
    }
}


function onImgInput(ev) {
    createMeme()
    loadImageFromInput(ev, addImg)
}


function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => {
            onImageReady(img.src)
            goToEditMeme()
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

