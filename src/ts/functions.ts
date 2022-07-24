import {CSS_CLASS} from "./settings";

export function deleteSearchFieldAndBasket(): void {
    const search: HTMLElement | null = document.querySelector(`.${CSS_CLASS.searchField}`)
    const basket: HTMLElement | null = document.querySelector(`.${CSS_CLASS.basket}`)

    basket?.remove()
    search?.remove()
}

export function highlightCurrentPage(page: string): void {
    const links = Array.from(document.querySelectorAll(`.${CSS_CLASS.linksLink}`)) as HTMLElement[]
    const active: HTMLElement | null = document.querySelector(`.${page}-${CSS_CLASS.pageLink}`)

    links.forEach(link => link.classList.remove(CSS_CLASS.active))

    if (active) {
        active.classList.add(CSS_CLASS.active)
    }
}
