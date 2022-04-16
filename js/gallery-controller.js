'use strict'

function renderGalleryImages() {
    var galleryImgsContainer = document.querySelector('.memes')
    var strHtml = ''
    for (let i = 0; i < 18; i++) {
        strHtml += `<img class="meme-image meme-image-${i+1}" src="imgs/meme-imgs/${i+1}.jpg" alt="Meme image">`
    }
    galleryImgsContainer.innerHTML = strHtml
}

function renderFilteredGalleryImages(filteredImgsIds) {
    var memeImages = getMemeImages()
    var strHtml = ''

    memeImages.forEach((memeImage) => {
        if (filteredImgsIds.indexOf(memeImage.id) !== -1) {
            strHtml += `<img class="meme-image meme-image-${memeImage.id}" src="imgs/meme-imgs/${memeImage.id}.jpg" alt="Meme image">`
        }
    })

    document.querySelector('.memes').innerHTML = strHtml
}

function addGalleryImagesListeners() {
    const elMemeImages = document.querySelectorAll('.meme-image')
    elMemeImages.forEach((elMemeImage) => {
        elMemeImage.addEventListener('mousedown', onGalleryImageClick)
    })
}

function onGalleryImageClick(ev) {
    document.querySelector('.gallery-section').style.display = "none"
    document.querySelector('.editor-section').style.display = "flex"
    setImgSrc(ev.path[0].src)
    renderMeme(ev.path[0].src)

    const elNavBtns = document.querySelectorAll('header nav a')
    elNavBtns.forEach(elNavBtn => {
        elNavBtn.style.borderBottom = 'none'
        elNavBtn.style.color = 'white'
    })
}