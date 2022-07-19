import {CSS_CLASS, shapeTranslate, value} from "./enum";
import {HTMLBuilder} from "./HTMLBuilder";
import {filterSortInterface} from "./interfaces";

export const filterSort: filterSortInterface[] = [
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

export const capacityBasket = 20;

export class NoResults extends HTMLBuilder {
    public create = (): HTMLElement => {
        const container: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.noResultsContainer,
        })

        const text: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.noResultsText,
            textContent: 'Ничего не найдено'
        })

        container.append(text)
        return container
    }
}