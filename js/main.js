'use strict'

function onInit() {

    renderGallery()
    renderKeywordsMap()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
}

function onOpenMenu() {
    document.body.classList.toggle('menu-open')
}

function onOpenGallery() {
    window.removeEventListener('resize', () => renderMeme())
    window.removeEventListener('resize', () => renderSavedMemes())
    renderGallery()
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.saves').classList.add('hide')
    document.querySelector('.edit').classList.add('hide')
    document.querySelector('.about').classList.add('hide')
    document.body.classList.remove('menu-open')
}

function onOpenSavedMemes() {
    window.removeEventListener('resize', () => renderMeme())
    window.addEventListener('resize', () => renderSavedMemes())
    renderSavedMemes()
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.saves').classList.add('hide')
    document.querySelector('.edit').classList.add('hide')
    document.querySelector('.about').classList.add('hide')
    document.body.classList.remove('menu-open')
}

function onOpenAbout() {
    window.removeEventListener('resize', () => renderMeme())
    window.removeEventListener('resize', () => renderSavedMemes())
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.saves').classList.add('hide')
    document.querySelector('.edit').classList.add('hide')
    document.querySelector('.about').classList.remove('hide')
    document.body.classList.remove('menu-open')
}