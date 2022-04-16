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