'use strict'

let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gCurrLineIdx = 0


function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        renderImg(img)
        // drawText(meme.lines[0])
        meme.lines.forEach(line => drawText(line))
    }
    renderEditor()
}

function renderImg(img) {
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderEditor() {
    const elEditor = document.querySelector('.edit')
    const elTxt = elEditor.querySelector('#txt')
    const elOutline = elEditor.querySelector('#outline')
    const elFill = elEditor.querySelector('#fill')

    const line = getLine(gCurrLineIdx)

    elTxt.value = line.txt
    elOutline.value = line.color
    elFill.value = line.fill
}


function drawText(line, x = 0, y = 0) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color

    gCtx.fillStyle = line.fill

    gCtx.font = `${line.size}px Impact`
    // gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function onTextInput(txt) {
    setLineText(txt, gCurrLineIdx)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onChangeOutline(color) {
    setLineColor(color, gCurrLineIdx)
    renderMeme()
}

function onChangeFill(color) {
    setLineFill(color, gCurrLineIdx)
    renderMeme()
}

function onChangeFontSize(dSize) {
    setLineSize(dSize, gCurrLineIdx)
    renderMeme()
}

function onAddLine() {
    gCurrLineIdx = addLine() - 1
    renderEditor()
}

function onSwitchLine() {
    gCurrLineIdx--
    if (gCurrLineIdx < 0) gCurrLineIdx = getNumOfLines() - 1
    renderEditor()
}




