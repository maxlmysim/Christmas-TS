import {HTMLBuilder} from '../HTMLBuilder'
import * as constants from '../constans'
import {paramsFilterSort} from "../interfaces";
import {filtersSettings, updateToys} from "./filters-settings";
import {ToysMenu} from "../toysCards/toys-menu";
import {CSS_CLASS} from "../enum";

export class SortSelection extends HTMLBuilder {
    create() {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersSort}, ${CSS_CLASS.sort}`,
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: `${CSS_CLASS.sortName}, ${CSS_CLASS.filterName}`,
            textContent: 'СОРТИРОВАТЬ'
        })

        const selection: HTMLElement = this.createElement({
            tag: 'select',
            className: CSS_CLASS.sortSelection,
        })

        selection.append(...constants.filterSort.map((elem: paramsFilterSort) => {
            return this.createElement({
                tag: 'option',
                className: CSS_CLASS.sortSelectionOption,
                value: elem.value,
                textContent: elem.textContent,
                selected: elem.selected,
                disabled: elem.disabled
            })
        }))

        selection.addEventListener('change', event => {
            filtersSettings.sort = (event.target as HTMLInputElement).value

            const pageToys = new ToysMenu()
            pageToys.init()

            updateToys()
        })

        wrapper.append(name, selection)

        return wrapper
    }
}