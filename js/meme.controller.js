'use strict'

let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gCurrMemeIdx = 0
let gCurrLineIdx = 0


function renderMeme() {
    const meme = getMeme(gCurrMemeIdx)
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        renderImg(img)
        if (!meme.lines.length) return
        meme.lines.forEach((line, lineIdx) => { drawText(line, lineIdx) })
        drawLineFrame()
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
    const elFont = elEditor.querySelector('#font')

    const line = getLine(gCurrMemeIdx)

    elTxt.value = line ? line.txt : ''
    elOutline.value = line ? line.color : '#000000'
    elFill.value = line ? line.fill : '#ffffff'
    elFont.value = line ? line.font : 'Impact'
    elFont.style.fontFamily = elFont.value
}


function drawText(line, lineIdx) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color

    gCtx.fillStyle = line.fill

    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textBaseline = 'top'
    gCtx.textAlign = line.alignDir

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
    setLineWidth(gCtx.measureText(line.txt).width, lineIdx, gCurrMemeIdx)
}

function onTextInput(txt) {
    setLineText(txt, gCurrMemeIdx)
    renderMeme()
}


function onChangeOutline(color) {
    setLineColor(color, gCurrMemeIdx)
    renderMeme()
}

function onChangeFill(color) {
    setLineFill(color, gCurrMemeIdx)
    renderMeme()
}

function onChangeFontSize(dSize) {
    setLineSize(dSize, gCurrMemeIdx)
    renderMeme()
}

function onAlignText(alignDir) {
    setLineAlignDir(alignDir, gCurrMemeIdx)
    renderMeme()
}

function onAddLine() {
    if (!document.querySelector('#txt').value) return
    addLine(gCurrMemeIdx)
    // renderEditor()
    renderMeme()
}

function onSwitchLine() {
    switchLineToEdit()
}

function onChangeFont(elFont) {
    setLineFont(elFont.value, gCurrMemeIdx)
    renderMeme()
}

function drawLineFrame() {
    let line = getLine(gCurrMemeIdx)
    gCtx.beginPath()
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = '#ffffff'
    if (line.alignDir === 'left') gCtx.rect(line.x - 10, line.y - 5, line.width + 20, line.size + 10)
    else if (line.alignDir === 'center') gCtx.rect(line.x - 10 - line.width / 2, line.y - 5, line.width + 20, line.size + 10)
    else if (line.alignDir === 'center') gCtx.rect(line.x - 10 - line.width, line.y - 5, line.width + 20, line.size + 10)
    gCtx.stroke()
    gCtx.closePath()
}

function onMouseDown(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    const lines = getMeme(gCurrMemeIdx).lines
    const clickedLine = lines.findIndex(line => {
        const { x, y, size, width } = line
        return offsetX >= x && offsetX <= x + width &&
            offsetY >= y && offsetY <= y + size
    })
    console.log('clickedLine:', clickedLine);
    if (clickedLine === -1) return
    setSelectedLineIdx(clickedLine, gCurrMemeIdx)
    renderMeme()
}

function onMoveY(dy) {
    setLineY(dy, gCurrMemeIdx)
    renderMeme()
}

function onMoveX(dx) {
    setLineX(dx, gCurrMemeIdx)
    renderMeme()
}


function onDeleteLine() {
    if (removeLine(gCurrMemeIdx))
        switchLineToEdit()
}

function switchLineToEdit() {
    switchSelectedLine(gCurrMemeIdx)
    renderMeme()
}

function onSaveMeme() {
    saveMeme(gCurrMemeIdx, imageToData())
}

function onDownloadMeme(elLink) {
    const imgContent = imageToData()
    console.log('imgContent:', imgContent);
    elLink.href = imgContent
}

function imageToData() {
    return gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
}
// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')

//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function addEventListeners() {
    // * Mouse Listeners
    gElCanvas.addEventListener('mousedown', onMouseDown)
    // gElCanvas.addEventListener('mousemove', onDrawLine)
    // gElCanvas.addEventListener('mouseup', onEndLine)

    // // * Touch Listeners
    // gElCanvas.addEventListener('touchstart', onStartLine)
    // gElCanvas.addEventListener('touchmove', onDrawLine)
    // gElCanvas.addEventListener('touchend', onEndLine)

    // // * Resize Listener
    // window.addEventListener('resize', resizeCanvas)
}

