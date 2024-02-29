'use strict'

var gIsSavedMemes = false

function renderGallery() {
    var imgsHTMLs
    // if (gIsSavedMemes) {
    //     imgsHTMLs = savedMemesToGallery()

    // } else {
        const imgs = getImgs()
        imgsHTMLs = imgs.map(img => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`)
    // }

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML += imgsHTMLs.join('')
}

function onImgSelect(imgId) {
    // if (gIsSavedMemes) {
    //     setCurrentMeme(imgId)
    // }
    // else {
        setMemeImg(imgId, 0)/************************ */
    // }
    renderMeme()
    document.querySelector('.gallery-container').style.display = 'none'
    // document.querySelector('.canvas-container').style.display = 'block'
    document.querySelector('.edit').style.display = 'grid'
}

function savedMemesToGallery() {
    const memes = getSavedMemes()
    return memes.map(meme => `<div onclick="onImageSelect('${meme.memeInfo.id}')">meme id:${meme.memeInfo.id}</div>`)
}
