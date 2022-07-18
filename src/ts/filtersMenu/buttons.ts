import {HTMLBuilder} from "../HTMLBuilder";
import {loadLocalStorage, resetFiltersPage, resetFiltersSettings, setFiltersSettings} from "./filters-settings";
import {ToysMenu} from "../toysCards/toys-menu";
import {resetBasket} from "../basket";


export class ButtonsSelector extends HTMLBuilder {
    create() {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__buttons, buttons',
        })

        const reset: HTMLElement = this.createElement({
            tag: 'button',
            className: 'filters__button, filters__button-reset, buttons__reset',
            textContent: 'сбросить фильтры'
        })

        const clear: HTMLElement = this.createElement({
            tag: 'button',
            className: 'filters__button, filters__button-clear, buttons__clear',
            textContent: 'очистить корзину'
        })

        reset.addEventListener('click', () => {
            setFiltersSettings({...resetFiltersSettings})

            const pageToys = new ToysMenu()
            pageToys.init()

            resetFiltersPage()

            const searchField = document.querySelector('.search-field') as HTMLInputElement
            if (searchField) {
                searchField.value = ''
            }
            loadLocalStorage()
        })

        clear.addEventListener('click', () => {
            resetBasket()
        })

        wrapper.append(reset, clear)

        return wrapper
    }
}
