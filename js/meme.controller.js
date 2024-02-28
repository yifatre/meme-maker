'use strict'

let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']




function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        renderImg(img)
        drawText(meme.lines[0])
    }
}

function renderImg(img) {
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function drawText(line, x = 0, y = 0) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color

    gCtx.fillStyle = line.fill

    gCtx.font = `${line.size}px Impact`
    // gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onTextInput(txt) {
    setLineText(txt)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onChangeOutline(color) {
    setLineColor(color)
    renderMeme()
}

function onChangeFill(color) {
    setLineFill(color)
    renderMeme()
}

// function onChangeFontSize(dSize){
//     setLineSize(dSize)
//     renderMeme()
// }


