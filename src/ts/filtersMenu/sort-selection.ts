import {HTMLBuilder} from '../HTMLBuilder'
import {classInitiator, paramsFilterSort} from "../interfaces";
import {filtersSettings, updateToys} from "./filters-settings";
import {ToysMenu} from "../toysCards/toys-menu";
import {CSS_CLASS, filterSort} from "../settings";

export class SortSelection extends HTMLBuilder {
    public create(): HTMLElement {
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

        selection.append(...filterSort.map((elem: paramsFilterSort): HTMLElement => {
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

            const pageToys: classInitiator = new ToysMenu()
            pageToys.init()

            updateToys()
        })

        wrapper.append(name, selection)

        return wrapper
    }
}