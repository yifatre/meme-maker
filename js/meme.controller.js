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

    const line = getLine(gCurrLineIdx)

    elTxt.value = line.txt
    elOutline.value = line.color
    elFill.value = line.fill
    elFont.value = line.font
}


function drawText(line, lineIdx) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color

    gCtx.fillStyle = line.fill

    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
    setLineWidth(gCtx.measureText(line.txt).width, lineIdx)
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
    renderMeme()
}

function onChangeFont(fontName) {
    setLineFont(fontName, gCurrLineIdx)
    renderMeme()
}

function drawLineFrame() {
    let line = getLine(gCurrLineIdx)
    gCtx.beginPath()
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = '#ffffff'
    gCtx.rect(line.x - 10, line.y - 5, line.width + 20, line.size + 10)
    gCtx.stroke()
    gCtx.closePath()
}

function onMouseDown(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    const lines = getMeme().lines
    const clickedLine = lines.findIndex(line => {
        const { x, y, size, width } = line
        return offsetX >= x && offsetX <= x + width &&
            offsetY >= y && offsetY <= y + size
    })
    console.log('hoveredLine:', clickedLine);
    if (clickedLine === -1) return
    gCurrLineIdx = clickedLine
    console.log('gCurrLineIdx:', gCurrLineIdx);
    renderMeme()
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

