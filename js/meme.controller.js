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

    const line = getLine()

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
    setLineWidth(gCtx.measureText(line.txt).width, lineIdx)
}

function onTextInput(txt) {
    setLineText(txt)
    renderMeme()
}


function onChangeOutline(color) {
    setLineColor(color)
    renderMeme()
}

function onChangeFill(color) {
    setLineFill(color)
    renderMeme()
}

function onChangeFontSize(dSize) {
    setLineSize(dSize)
    renderMeme()
}

function onAlignText(alignDir) {
    setLineAlignDir(alignDir)
    renderMeme()
}

function onAddLine() {
    if (!document.querySelector('#txt').value) return
    addLine()
    renderMeme()
}

function onAddSticker(elBtn) {
    addLine(elBtn.innerText)
    renderMeme()
}

function onSwitchLine() {
    switchLineToEdit()
}

function onChangeFont(elFont) {
    setLineFont(elFont.value)
    renderMeme()
}

function drawLineFrame() {
    let line = getLine()
    gCtx.beginPath()
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = '#ffffff'
    if (line.alignDir === 'left') gCtx.rect(line.x - 10, line.y - 5, line.width + 20, line.size + 10)
    else if (line.alignDir === 'center') gCtx.rect(line.x - 10 - line.width / 2, line.y - 5, line.width + 20, line.size + 10)
    else if (line.alignDir === 'center') gCtx.rect(line.x - 10 - line.width, line.y - 5, line.width + 20, line.size + 10)
    gCtx.stroke()
    gCtx.closePath()
}


function onMoveY(dy) {
    setLineY(dy)
    renderMeme()
}

function onMoveX(dx) {
    setLineX(dx)
    renderMeme()
}


function onDeleteLine() {
    if (removeLine())
        switchLineToEdit()
}

function switchLineToEdit() {
    switchSelectedLine()
    renderMeme()
}

function onSaveMeme() {
    saveMeme(imageToData())
}

function onDownloadMeme(elLink) {
    const imgContent = imageToData()
    console.log('imgContent:', imgContent);
    elLink.href = imgContent
}

function imageToData() {
    return gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
}

function onMouseDown(ev) {
    const pos = getEvPos(ev)
    const lines = getMeme().lines
    const clickedLine = lines.findIndex(line => {
        const { x, y, size, width } = line
        return pos.x >= x && pos.x <= x + width &&
            pos.y >= y && pos.y <= y + size
    })
    if (clickedLine === -1) return
    lines[clickedLine].isDrag = true
    console.log('clickedLine:', clickedLine);
    if (clickedLine === -1) return
    setSelectedLineIdx(clickedLine)
    renderMeme()
    document.body.style.cursor = 'grabbing'
}

function onDrag(ev) {
    const line = getLine()
    if (!line.isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    const dx = pos.x - line.x
    const dy = pos.y - line.y

    setLineX(dx)
    setLineY(dy)

    renderMeme()
}

function onMouseUp() {
    const line = getLine()
    line.isDrag = false
    document.body.style.cursor = 'grab'
}


function addEventListeners() {
    // * Mouse Listeners
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onDrag)
    gElCanvas.addEventListener('mouseup', onMouseUp)

    // * Touch Listeners
    gElCanvas.addEventListener('touchstart', onMouseDown)
    gElCanvas.addEventListener('touchmove', onDrag)
    gElCanvas.addEventListener('touchend', onMouseUp)

    // // * Resize Listener
    // window.addEventListener('resize', resizeCanvas)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        // Calc pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

