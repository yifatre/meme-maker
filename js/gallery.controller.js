'use strict'

function renderGallery() {
    const imgs = getImgs()
    var imgsHTML = imgs.map(img => `<div class="img-container"><img src="${img.url}" alt="" onclick="onImgSelect(${img.id})"></div>`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTML.join('')
}

function onImgSelect(imgId) {
    setMemeImg(imgId)
    renderMeme()
    // document.querySelector('.gallery-container').style.display = 'none'
    // document.querySelector('.canvas-container').style.display = 'block'
    // document.querySelector('.edit').style.display = 'flex'
}