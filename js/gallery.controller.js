'use strict'

var gIsSavedMemes = false

function renderGallery(word = '') {
    var imgsHTMLs

    const imgs = getImgs(word)
    imgsHTMLs = imgs.map(img => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTMLs.join('')
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