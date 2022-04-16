'use strict'

var gFilterKeys =   ['politician', 'actor', 'cartoon', 'animal', 'dog', 'cat', 'baby', 'smile', 'kiss', 'sleep', 'glasses', 'no-glasses', 'no-smile', 'no-dog']

function getFilterKeys() {
    return gFilterKeys
}

function getFilteredImagesIds(key) {
    var memeImages = getMemeImages()
    var ids = []

    memeImages.forEach((memeImage, idx) => {
        memeImage.keys.forEach(imageKey => {
            if (imageKey === key) {
                ids.push(memeImage.id)        
            }
        })
    })
    return ids
}