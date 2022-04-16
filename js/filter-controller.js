'use strict'

function renderFilterSection() {
    renderSearchInputDatalist()
    renderClickFilter()
}

function renderSearchInputDatalist() {
    var filterKeys = getFilterKeys()
    var elSearchFilter = document.querySelector('.search-filter')
    var strHtml = '<datalist id="filter-input">'
    filterKeys.forEach(filterKey => {
        strHtml += `<option value="${filterKey}">`
    })

    strHtml += '</datalist>'

    elSearchFilter.innerHTML += strHtml
}

function renderClickFilter() {
    var elClickFilter = document.querySelector('.click-filter')
    var filterKeys = getFilterKeys()
    var strHtml = ''

    for (let i = 0; i < 5; i++) {
        strHtml += `<div>${filterKeys[i]}</div>`
    }

    strHtml += `<div class="filter-more-btn">more...</div>`

    for (let i = 5; i < filterKeys.length; i++) {
        strHtml += `<div class="filter-more-item hide">${filterKeys[i]}</div>`
    }
    strHtml += `<div class="filter-more-item hide filter-more-close">close...</div>`

    elClickFilter.innerHTML = strHtml
}

// EVENT LISTENERS:

function addFilterEventListeners() {
    //MORE BUTTON:
    const elFilterMoreBtn = document.querySelector('.filter-more-btn')
    elFilterMoreBtn.addEventListener('mousedown', onFilterMoreBtnClick)

    //MORE CLOSE BUTTON:
    const elFilterMoreCloseBtn = document.querySelector('.filter-more-close')
    elFilterMoreCloseBtn.addEventListener('mousedown', onFilterMoreCloseBtn)

    //KEYS:
    const elFilterKeyBtns = document.querySelectorAll('.click-filter > *')
    elFilterKeyBtns.forEach(elFilterKeyBtn => {
        elFilterKeyBtn.addEventListener('mousedown', onFilterKeyClick)
    })

    //TEXT INPUT FILTER:
    const elFilterInput = document.querySelector('.filter-input')
    elFilterInput.addEventListener('change', onFilterChange)
}


function onFilterMoreBtnClick() {
    const elFilterMoreBtn = document.querySelector('.filter-more-btn')
    const elFilterMoreItems = document.querySelectorAll('.filter-more-item')
    elFilterMoreBtn.style.display = 'none'
    elFilterMoreItems.forEach(item => {
        item.style.display = 'inline'
    })
}

function onFilterMoreCloseBtn() {
    const elFilterMoreBtn = document.querySelector('.filter-more-btn')
    const elFilterMoreItems = document.querySelectorAll('.filter-more-item')

    elFilterMoreBtn.style.display = 'inline'
    elFilterMoreItems.forEach(item => {
        item.style.display = 'none'
    })
}

function onFilterKeyClick(ev) {
    var filteredImgsIds = getFilteredImagesIds(ev.target.innerText)
    renderFilteredGalleryImages(filteredImgsIds)
    addGalleryImagesListeners()
}

function onFilterChange(ev) {
    var filteredImgsIds = getFilteredImagesIds(document.querySelector('.filter-input').value)
    renderFilteredGalleryImages(filteredImgsIds)
    addGalleryImagesListeners()
}