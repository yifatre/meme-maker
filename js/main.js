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
    renderGallery()
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.saves').style.display = 'none'
    document.querySelector('.edit').style.display = 'none'
    document.body.classList.remove('menu-open')
}

function onOpenSavedMemes() {
    renderSavedMemes()
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.saves').style.display = 'none'
    document.querySelector('.edit').style.display = 'none'
    document.body.classList.remove('menu-open')
}