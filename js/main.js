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