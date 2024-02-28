'use strict'

let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()


}


function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        renderImg(img)
        drawText(meme.lines[0].txt)
    }
}

function renderImg(img) {
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function drawText(text = 'hello', x = 0, y = 0) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = 'white'

    gCtx.font = '45px Impact'
    // gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onTextInput(txt) {
    setLineText(txt)
    renderMeme()
}


