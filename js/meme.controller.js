'use strict'

let gElCanvas
let gCtx

let gPrevPos = null
let gIsDrag = false
let gIsResize = false

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    if (meme.userImgUrl) img.src = meme.userImgUrl
    else img.src = getImgById(meme.selectedImgId).url
    img.onload = () => {
        const elContainer = document.querySelector(`.canvas-container`)
        gElCanvas.width = Math.min(elContainer.clientWidth, img.naturalWidth)
        elContainer.style.width = gElCanvas.width + 'px'
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        renderImg(img)
        if (!meme.lines.length) return
        meme.lines.forEach((line, lineIdx) => {
            drawText(line, lineIdx)
            setLineWidth(gCtx.measureText(line.txt).width, lineIdx)
        })
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
    const elBtnOutlineSvg = elEditor.querySelector('.outline svg path')
    const elBtnFillSvg = elEditor.querySelector('.fill svg path')

    const line = getLine()

    elTxt.value = line ? line.txt : ''
    elOutline.value = line ? line.color : '#000000'
    elBtnOutlineSvg.setAttribute('fill', elOutline.value)
    elFill.value = line ? line.fill : '#ffffff'
    elBtnFillSvg.setAttribute('fill', elFill.value)
    elFont.value = line ? line.font : 'Impact'
    elFont.style.fontFamily = elFont.value
}

function drawText(line, lineIdx, ctx = gCtx, widthRatio = 1) {
    ctx.lineWidth = 1
    ctx.strokeStyle = line.color

    ctx.fillStyle = line.fill

    ctx.font = `${line.size * widthRatio}px ${line.font}`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center' //line.alignDir

    ctx.fillText(line.txt, line.x * widthRatio, line.y * widthRatio)
    ctx.strokeText(line.txt, line.x * widthRatio, line.y * widthRatio)

}

function onTextInput(txt) {
    if (!getLine()) addLine(txt, gElCanvas.width / 2, gElCanvas.height / 2)
    else setLineText(txt)
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
    setLineAlignDir(alignDir, gElCanvas.width)
    renderMeme()
}

function onAddLine() {
    if (!document.querySelector('#txt').value) return
    addLine()
    renderMeme()
}

function onAddSticker(elBtn) {
    addLine(elBtn.innerText, gElCanvas.width / 2, gElCanvas.height / 2)
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
    if (!line || !line.txt) return
    gCtx.beginPath()
    gCtx.lineWidth = '1'
    gCtx.strokeStyle = '#ffffff'
    gCtx.setLineDash([10, 5]);
    gCtx.rect(line.x - 10 - line.width / 2, line.y - 5 - line.size / 2, line.width + 20, line.size + 10)
    gCtx.stroke()
    gCtx.closePath()
}

function onMoveY(dy) {
    moveLineY(dy)
    renderMeme()
}

function onMoveX(dx) {
    moveLineX(dx)
    renderMeme()
}

function onDeleteLine() {
    if (removeLine()) switchLineToEdit()
}

function switchLineToEdit() {
    switchSelectedLine()
    renderMeme()
}

function onSaveMeme() {
    saveMeme(imageToData())
    const elModal = document.querySelector('.msgs')
    elModal.querySelector('h4').innerText = 'Meme saved for later'
    elModal.showModal()
    setTimeout(() => elModal.close(), 1500)
}

function onDownloadMeme(ev) {
    clearSelection()

    setTimeout(() => {
        const imgContent = imageToData()
        const elLink = document.querySelector('.download-link')
        elLink.href = imgContent
        elLink.click()
    }, 10)
}

function clearSelection() {
    setSelectedLineIdx(-1)
    renderMeme()
}

function imageToData() {
    return gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
}

function onMouseDown(ev) {
    const pos = getEvPos(ev)
    const line = getLine()
    if (line) {
        const { x1, x2, y1, y2 } = {
            x1: Math.floor(line.x - 10 - line.width / 2),
            x2: Math.ceil(line.x + 10 + line.width / 2),
            y1: Math.floor(line.y - 5 - line.size / 2),
            y2: Math.ceil(line.y + 5 + line.size / 2)
        }
        // console.log('pos:', pos);
        // console.log('x1, x2, y1, y2:', x1, x2, y1, y2);

        if (((pos.y >= y1 - 2 && pos.y <= y1 + 2)
            || (pos.y >= y2 - 2 && pos.y <= y2 + 2)) &&
            (pos.x >= x1 && pos.x <= x2)) {
            // gIsResize = true
            gElCanvas.style.cursor = 'ns-resize'
            gIsResize = true
            gPrevPos = pos
            return
        }
    }
    const lines = getMeme().lines
    const clickedLine = lines.findIndex(line => {
        const { x, y, size, width } = line
        return pos.x >= x - width / 2 && pos.x <= x + width / 2 &&
            pos.y >= y - size / 2 && pos.y <= y + size / 2
    })
    setSelectedLineIdx(clickedLine)
    renderMeme()
    if (clickedLine === -1) return
    gIsDrag = true
    gElCanvas.style.cursor = 'grabbing'
    gPrevPos = pos
}

function onMouseMove(ev) {
    const pos = getEvPos(ev)
    const line = getLine()
    if (!line) return

    if (!gIsResize && !gIsDrag) {
        const { x1, x2, y1, y2 } = {
            x1: Math.floor(line.x - 10 - line.width / 2),
            x2: Math.ceil(line.x + 10 + line.width / 2),
            y1: Math.floor(line.y - 5 - line.size / 2),
            y2: Math.ceil(line.y + 5 + line.size / 2)
        }

        if (((pos.y >= y1 - 2 && pos.y <= y1 + 2)
            || (pos.y >= y2 - 2 && pos.y <= y2 + 2)) &&
            (pos.x >= x1 && pos.x <= x2)) {
            gElCanvas.style.cursor = 'ns-resize'
        }
        else gElCanvas.style.cursor = 'grab'
        return
    }
    const dx = pos.x - gPrevPos.x
    let dy = pos.y - gPrevPos.y

    if (gIsResize) {
        if (pos.y < line.y) dy = -dy
        setLineSize(dy)
    }

    // const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    if (gIsDrag) {
        moveLineX(dx)
        moveLineY(dy)
    }
    renderMeme()
    gPrevPos = pos
    window.addEventListener('mouseup', onMouseUp)
}

function onMouseUp() {
    if (getSelectedLine() === -1) return
    const line = getLine()
    if (!line) return

    gIsDrag = false
    gIsResize = false
    gElCanvas.style.cursor = 'grab'
    gPrevPos = null

    window.removeEventListener('mouseup', onMouseUp)
}

function addEventListeners() {
    // * Mouse Listeners
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)

    // * Touch Listeners
    gElCanvas.addEventListener('touchstart', onMouseDown)
    gElCanvas.addEventListener('touchmove', onMouseMove)
    gElCanvas.addEventListener('touchend', onMouseUp)

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

//**************SHARES************/
function onUploadImgToFacebook() {
    // Gets the image from the canvas
    clearSelection()

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    setTimeout(() => {
        const imgDataUrl = imageToData()
        doUploadImg(imgDataUrl, onSuccess)
    }, 500)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

async function onShare() {
    clearSelection()
    setTimeout(() => {
        const dataUrl = imageToData()
        sharing(dataUrl)
    }, 500)
}

async function sharing(dataUrl) {
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'meme.jpg',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };

    const elModal = document.querySelector('.msgs')
    const elMsg = elModal.querySelector('h4')
    if (!navigator.canShare) {
        elMsg.innerText = 'Your browser doesn\'t support the Web Share API'
        elModal.showModal()
        setTimeout(() => elModal.close(), 1500)
        return;
    }

    if (navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            elMsg.innerText = 'Shared!'
            elModal.showModal()
            setTimeout(() => elModal.close(), 1500)

        } catch (error) {
            elMsg.innerText = `Error: ${error.message}`
            elModal.showModal()
            setTimeout(() => elModal.close(), 15000)
        }
    } else {
        elMsg.innerText = 'Your system doesn\'t support sharing these files'
        elModal.showModal()
        setTimeout(() => elModal.close(), 1500)
    }

}