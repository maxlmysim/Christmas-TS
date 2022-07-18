import {shapeTranslate, value} from "./enum";
import {HTMLBuilder} from "./HTMLBuilder";

export const filterSort = [
    {
        value: value.base,
        textContent: 'Выберите сортировку',
        disabled: true
    },
    {
        value: value.sortNameDown,
        textContent: 'По названию от "А" до "Я"',
        selected: true
    },
    {
        value: value.sortNameUp,
        textContent: 'По названию от "Я" до "А"',
    },
    {
        value: value.sortDateDown,
        textContent: 'По дате покупки по убыванию',
    },
    {
        value: value.sortDateUp,
        textContent: 'По дате покупки по возрастанию',
    }
]

export const filterShape = shapeTranslate.map(toy => {
    return {
        name: toy.en,
        textContent: toy.ru,
    }
})

export const filtersColors = ['white', 'yellow', 'red', 'green', 'blue']

export const filterSize = []

export const capacityBasket = 20;

export class NoResults extends HTMLBuilder {
    create = () => {
        const container = this.createElement({
            tag: 'div',
            className: 'no-results__container',
        })

        const text = this.createElement({
            tag: 'p',
            className: 'no-results__text',
            textContent: 'Ничего не найдено'
        })

        container.append(text)
        return container
    }
}