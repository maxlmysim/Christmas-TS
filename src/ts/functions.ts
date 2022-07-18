export function deleteSearchFieldAndBasket(): void {
    const search = document.querySelector('.search-field')
    const basket = document.querySelector('.basket')

    basket?.remove()
    search?.remove()
}