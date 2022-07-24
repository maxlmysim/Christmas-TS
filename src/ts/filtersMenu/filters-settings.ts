import {classCreator, paramsFiltersSettings, paramsToy} from "../interfaces";
import {FiltersMenu} from "./filters-menu";
import data from "../../data/data";
import {checkboxName, CSS_CLASS, dataAttribute, localStorageVariable, value} from "../settings";
import {basket, changeNumberBasket} from "../elements/basket";
import {NoResults} from "../toysCards/noResults";

export let filtersSettings: paramsFiltersSettings = {
    sort: value.base,
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
    sort: value.base,
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
    const nodeCards = Array.from(document.querySelectorAll(`.${CSS_CLASS.toyCard}`)) as HTMLElement[]
    const ids: string[] = updateDataWithFiltersSettings().map(data => data.num);
    const cardsHide: HTMLElement[] = nodeCards.filter(card => {
        const id = card.getAttribute(dataAttribute.id)

        if (!id) {
            return
        }

        return !ids.includes(id)
    })

    function animate(i: number): void {
        if (!cardsHide[i]) {
            return
        }

        const card: HTMLElement = cardsHide[i]
        card.classList.add(CSS_CLASS.anim);
        card.onanimationend = (): void => {
            animate(i + 1)
            card.classList.add(CSS_CLASS.hide);
        }
    }

    if (cardsHide.length !== 0) {
        animate(0)
    }

    checkEmpty(nodeCards, cardsHide)
}

function showAllCards(): void {
    const nodeCards = Array.from(document.querySelectorAll(`.${CSS_CLASS.toyCard}`)) as HTMLElement[]
    nodeCards.forEach(card => card.classList.remove(CSS_CLASS.anim, CSS_CLASS.hide))
}

function checkEmpty(nodeCards: HTMLElement[], cardsHide: Element[]): void {
    const place: HTMLElement | null = document.querySelector(`.${CSS_CLASS.noResultsContainer}`)
    place?.remove()

    if (nodeCards.length === cardsHide.length) {
        const results: classCreator = new NoResults()
        const place: HTMLElement | null = document.querySelector(`.${CSS_CLASS.toysCards}`)
        place?.append(results.create())
    }
}

function saveLocalStorage(): void {
    localStorage.setItem(localStorageVariable.settings, JSON.stringify(filtersSettings))
}

export function loadLocalStorage(): void {
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
        const shapes = Array.from(document.querySelectorAll(`.${CSS_CLASS.shapeToy}`)) as HTMLElement[]

        shapes.forEach(toy => {
            const name: string | null = toy.getAttribute(dataAttribute.shape)
            if (name) {
                if (filtersSettings.shape.includes(name)) {
                    toy.classList.add(CSS_CLASS.active)
                }
            }
        })
    }

    if (filtersSettings.color.length !== 0) {
        const colors = Array.from(document.querySelectorAll(`.${CSS_CLASS.colorsColor}`)) as HTMLElement[]

        colors.forEach(color => {
            const name: string | null = color.getAttribute(dataAttribute.color)
            if (name) {
                if (filtersSettings.color.includes(name)) {
                    color.classList.add(CSS_CLASS.active)
                }
            }
        })
    }

    if (filtersSettings.size.length !== 0) {
        const sizes = Array.from(document.querySelectorAll(`input[name=${checkboxName.size}]`)) as HTMLInputElement[]

        sizes.forEach(size => {
            const name: string | null = size.getAttribute(dataAttribute.size)
            if (name) {
                if (filtersSettings.size.includes(name)) {
                    size.checked = true
                }
            }
        })
    }

    if (filtersSettings.popular) {
        const popular = document.querySelector(`input[name=${checkboxName.popular}]`) as HTMLInputElement | null
        if (popular) {
            popular.checked = true
        }
    }
    if (basket.size !== 0) {
        const toys = Array.from(document.querySelectorAll(`.${CSS_CLASS.toyCard}`)) as HTMLInputElement[]

        toys.forEach(toy => {
            const id: string | null = toy.getAttribute(dataAttribute.id)

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
    const toysPage = document.querySelector(`.${CSS_CLASS.toysPage}`) as HTMLElement | null
    document.querySelector(`.${CSS_CLASS.filtersMenu}`)?.remove()
    toysPage?.append((new FiltersMenu()).create())
}

export function sortSelection(newData: paramsToy[]): paramsToy[] {
    if (filtersSettings.sort === value.sortNameDown) {
        newData.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name))
    } else if (filtersSettings.sort === value.sortNameUp) {
        newData.sort((toy1, toy2) => toy2.name.localeCompare(toy1.name))
    } else if (filtersSettings.sort === value.sortDateDown) {
        newData.sort((toy1, toy2) => Number(toy1.year) - Number(toy2.year))
    } else if (filtersSettings.sort === value.sortDateUp) {
        newData.sort((toy1, toy2) => Number(toy2.year) - Number(toy1.year))
    }
    return newData
}

const shapeSelection = (newData: paramsToy[]): paramsToy[] => newData.filter(toy => filtersSettings.shape.includes(toy.shape))

const quantitySelection = (newData: paramsToy[]): paramsToy[] => {
    newData = newData.filter(toy => +toy.count >= filtersSettings.quantityMin &&
        +toy.count <= filtersSettings.quantityMax)
    return newData
}

const yearSelection = (newData: paramsToy[]): paramsToy[] => {
    newData = newData.filter(toy => +toy.year >= filtersSettings.yearMin &&
        +toy.year <= filtersSettings.yearMax)
    return newData
}

const colorSelection = (newData: paramsToy[]): paramsToy[] => newData.filter(toy => filtersSettings.color.includes(toy.color))

const sizeSelection = (newData: paramsToy[]): paramsToy[] => newData.filter(toy => filtersSettings.size.includes(toy.size))

const popularSelection = (newData: paramsToy[]): paramsToy[] => newData.filter(toy => toy.favorite)

export const searchToys = (newData: paramsToy[]): paramsToy[] => newData.filter(toy => toy.name.toLowerCase().includes(filtersSettings.search.toLowerCase()))
