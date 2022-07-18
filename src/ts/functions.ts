export function deleteSearchFieldAndBasket(): void {
    const search = document.querySelector('.search-field')
    const basket = document.querySelector('.basket')

    basket?.remove()
    search?.remove()
}

export function showCurrentPage(page: string) {
    const links = document.querySelectorAll('.links__link')
    const active = document.querySelector(`.${page}-page-link`)

    if (links) {
        links.forEach(link => link.classList.remove('active'))
    }

    if(active) {
        active.classList.add('active')
    }
}