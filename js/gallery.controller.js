'use strict'

function renderGallery() {
    const imgs = getImgs()
    var imgsHTMLs = imgs.map(img => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = imgsHTMLs.join('')
}

function onImgSelect(imgId) {
    setMemeImg(imgId)
    renderMeme()
    document.querySelector('.gallery-container').style.display = 'none'
    // document.querySelector('.canvas-container').style.display = 'block'
    document.querySelector('.edit').style.display = 'grid'
}