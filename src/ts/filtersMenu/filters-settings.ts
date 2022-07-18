import {paramsFiltersSettings, paramsToy} from "../interfaces";
import {FiltersMenu} from "./filters-menu";
import data from "../../data/data";

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

    return newData
}

export function updateToys(): void {
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
}

function showAllCards() {
    const nodeCards = document.querySelectorAll('.toy-card')
    Array.from(nodeCards).sort()
    nodeCards.forEach(card => card.classList.remove('anim', 'hide'))
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

export function shapeSelection(newData: paramsToy[]) {
    newData = newData.filter(toy => filtersSettings.shape.includes(toy.shape))
    return newData
}

export function quantitySelection(newData: paramsToy[]) {
    newData = newData.filter(toy => +toy.count >= filtersSettings.quantityMin &&
        +toy.count <= filtersSettings.quantityMax)
    return newData
}

export function yearSelection(newData: paramsToy[]) {
    newData = newData.filter(toy => +toy.year >= filtersSettings.yearMin &&
        +toy.year <= filtersSettings.yearMax)
    return newData
}

export function colorSelection(newData: paramsToy[]) {
    newData = newData.filter(toy => filtersSettings.color.includes(toy.color))
    return newData
}

export function sizeSelection(newData: paramsToy[]) {
    newData = newData.filter(toy => filtersSettings.size.includes(toy.size))
    return newData
}

export function popularSelection(newData: paramsToy[]) {
    newData = newData.filter(toy => toy.favorite)
    return newData
}