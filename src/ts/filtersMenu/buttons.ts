import {HTMLBuilder} from "../HTMLBuilder";
import {loadLocalStorage, resetFiltersPage, resetFiltersSettings, setFiltersSettings} from "./filters-settings";
import {ToysMenu} from "../toysCards/toys-menu";
import {resetBasket} from "../elements/basket";
import {classCreator, classInitiator} from "../interfaces";
import {CSS_CLASS} from "../settings";


export class ButtonsSelector extends HTMLBuilder implements classCreator{
    public create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersButtons}, ${CSS_CLASS.buttons}`,
        })

        const reset: HTMLElement = this.createElement({
            tag: 'button',
            className: `${CSS_CLASS.filtersButton}, ${CSS_CLASS.filtersButtonsReset}, ${CSS_CLASS.buttonsReset}`,
            textContent: 'сбросить фильтры'
        })

        const clear: HTMLElement = this.createElement({
            tag: 'button',
            className: `${CSS_CLASS.filtersButton}, ${CSS_CLASS.filtersButtonsClear}, ${CSS_CLASS.buttonsClear}`,
            textContent: 'очистить корзину'
        })

        reset.addEventListener('click', (): void => {
            setFiltersSettings({...resetFiltersSettings})

            const pageToys: classInitiator = new ToysMenu()
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
