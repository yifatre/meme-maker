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
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.saves').classList.add('hide')
    document.querySelector('.edit').classList.add('hide')
    document.body.classList.remove('menu-open')
}

function onOpenSavedMemes() {
    renderSavedMemes()
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.saves').classList.add('hide')
    document.querySelector('.edit').classList.add('hide')
    document.body.classList.remove('menu-open')
}