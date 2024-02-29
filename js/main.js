'use strict'

function onInit() {

    renderGallery()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
}

function onOpenMenu(){
    document.body.classList.toggle('menu-open')
}

function onOpenGallery(){
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.saves').style.display = 'none'
    document.querySelector('.edit').style.display = 'none'
}