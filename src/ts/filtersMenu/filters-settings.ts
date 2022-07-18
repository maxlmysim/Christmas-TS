import {paramsFiltersSettings, paramsToy} from "../interfaces";
import {FiltersMenu} from "./filters-menu";
import data from "../../data/data";
import {NoResults} from "../constans";
import {CSS_CLASS} from "../enum";
import {basket, changeNumberBasket} from "../basket";

export let filtersSettings: paramsFiltersSettings = {
    sort: 'sortNameDown',
    shape: [],
    quantityMin: -Infinity,
    quantityMax: Infinity,
    yearMin: -Infinity,
    yearMax: Infinity,
    color: [],
    size: [],
    popular: false,
    search: '',
    basket: []
}

export function setFiltersSettings(obj: paramsFiltersSettings): void {
    filtersSettings = JSON.parse(JSON.stringify(obj))
}

export const resetFiltersSettings: paramsFiltersSettings = {
    sort: 'sortNameDown',
    shape: [],
    quantityMin: -Infinity,
    quantityMax: Infinity,
    yearMin: -Infinity,
    yearMax: Infinity,
    color: [],
    size: [],
    popular: false,
    search: '',
    basket: []
}

function updateDataWithFiltersSettings(): paramsToy[] {
    let newData: paramsToy[] = data.map(toy => toy)
    if (filtersSettings.sort) {
        newData = sortSelection(newData)
    }

    if (filtersSettings.shape.length !== 0) {
        newData = shapeSelection(newData)
    }

    newData = quantitySelection(newData)
    newData = yearSelection(newData)

    if (filtersSettings.color.length !== 0) {
        newData = colorSelection(newData)
    }

    if (filtersSettings.size.length !== 0) {
        newData = sizeSelection(newData)
    }

    if (filtersSettings.popular) {
        newData = popularSelection(newData)
    }

    if (filtersSettings.search) {
        newData = searchToys(newData)
    }

    return newData
}

export function updateToys(): void {
    saveLocalStorage()
    showAllCards()
    const nodeCards = document.querySelectorAll('.toy-card')
    if (!nodeCards) return
    const ids = updateDataWithFiltersSettings().map(data => data.num);
    const cardsHide = Array.from(nodeCards).filter(card => {
        const id = card.getAttribute('id')

        if (!id) {
            return
        }

        return !ids.includes(id)
    })

    function animate(i: number) {
        if (!cardsHide[i]) {
            return
        }

        const card = cardsHide[i] as HTMLElement
        card.classList.add('anim');
        card.onanimationend = () => {
            animate(i + 1)
            card.classList.add('hide');
        }
    }

    if (cardsHide.length !== 0) {
        animate(0)
    }

    checkEmpty(nodeCards, cardsHide)
}

function showAllCards() {
    const nodeCards = document.querySelectorAll('.toy-card')
    Array.from(nodeCards).sort()
    nodeCards.forEach(card => card.classList.remove('anim', 'hide'))
}

function checkEmpty(nodeCards: NodeList, cardsHide: Element[]) {
    const place = document.querySelector('.no-results__container')
    place?.remove()

    if (nodeCards.length === cardsHide.length) {
        const results = new NoResults()
        const place = document.querySelector('.toys-cards')
        place?.append(results.create())
    }
}

function saveLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(filtersSettings))
}

export function loadLocalStorage() {
    updateToys()

    if (filtersSettings.sort) {
        const sort = Array.from(document.querySelectorAll(`.${CSS_CLASS.sortSelectionOption}`)) as HTMLOptionElement[]
        sort.forEach(option => {
            if (option.value === filtersSettings.sort) {
                option.selected = true
            }
        })
    }

    if (filtersSettings.shape.length !== 0) {
        const shapes = document.querySelectorAll(`.${CSS_CLASS.shapeToy}`)

        shapes.forEach(toy => {
            const name = toy.getAttribute('shape')
            if (name) {
                if (filtersSettings.shape.includes(name)) {
                    toy.classList.add('active')
                }
            }

        })
    }

    if (filtersSettings.color.length !== 0) {
        const colors = document.querySelectorAll(`.${CSS_CLASS.colorsColor}`)

        colors.forEach(color => {
            const name = color.getAttribute('color')
            if (name) {
                if (filtersSettings.color.includes(name)) {
                    color.classList.add('active')
                }
            }

        })
    }

    if (filtersSettings.size.length !== 0) {
        const sizes = Array.from(document.querySelectorAll(`input[name="size"]`)) as HTMLInputElement[]

        sizes.forEach(size => {
            const name = size.getAttribute('size')
            if (name) {
                if (filtersSettings.size.includes(name)) {
                    size.checked = true
                }
            }

        })
    }

    if (filtersSettings.popular) {
        const popular = document.querySelector(`input[name="popular"]`) as HTMLInputElement
        popular.checked = true
    }
    if (basket.size !== 0) {
        const toys = document.querySelectorAll(`.${CSS_CLASS.toyCard}`)

        toys.forEach(toy => {
            const id = toy.getAttribute('id')

            if (id) {
                if (basket.has(id)) {
                    toy.classList.add(`${CSS_CLASS.toyCardBasket}`)
                }
            }
        })

        changeNumberBasket()
    }
}

export function resetFiltersPage(): void {
    const toysPage = document.querySelector('.toys-page')
    document.querySelector('.filters-menu')?.remove()
    toysPage?.append((new FiltersMenu()).create())
}

export function sortSelection(newData: paramsToy[]) {
    if (filtersSettings.sort === 'sortNameDown') {
        newData.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name))
    } else if (filtersSettings.sort === 'sortNameUp') {
        newData.sort((toy1, toy2) => toy2.name.localeCompare(toy1.name))
    } else if (filtersSettings.sort === 'sortDateDown') {
        newData.sort((toy1, toy2) => Number(toy1.year) - Number(toy2.year))
    } else if (filtersSettings.sort === 'sortDateUp') {
        newData.sort((toy1, toy2) => Number(toy2.year) - Number(toy1.year))
    }
    return newData
}

const shapeSelection = (newData: paramsToy[]) => newData.filter(toy => filtersSettings.shape.includes(toy.shape))

const quantitySelection = (newData: paramsToy[]) => {
    newData = newData.filter(toy => +toy.count >= filtersSettings.quantityMin &&
        +toy.count <= filtersSettings.quantityMax)
    return newData
}

const yearSelection = (newData: paramsToy[]) => {
    newData = newData.filter(toy => +toy.year >= filtersSettings.yearMin &&
        +toy.year <= filtersSettings.yearMax)
    return newData
}

const colorSelection = (newData: paramsToy[]) => newData.filter(toy => filtersSettings.color.includes(toy.color))

const sizeSelection = (newData: paramsToy[]) => newData.filter(toy => filtersSettings.size.includes(toy.size))

const popularSelection = (newData: paramsToy[]) => newData.filter(toy => toy.favorite)

export const searchToys = (newData: paramsToy[]) => newData.filter(toy => toy.name.toLowerCase().includes(filtersSettings.search.toLowerCase()))
