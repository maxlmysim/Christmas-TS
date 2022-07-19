import {CSS_CLASS} from "./settings";

export function deleteSearchFieldAndBasket(): void {
    const search: HTMLElement | null = document.querySelector('.search-field')
    const basket: HTMLElement | null = document.querySelector('.basket')

    basket?.remove()
    search?.remove()
}

export function highlightCurrentPage(page: string): void {
    const links = Array.from(document.querySelectorAll('.links__link')) as HTMLElement[]
    const active: HTMLElement | null = document.querySelector(`.${page}-page-link`)

    links.forEach(link => link.classList.remove(CSS_CLASS.active))

    if (active) {
        active.classList.add(CSS_CLASS.active)
    }
}