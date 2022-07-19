import {HTMLBuilder} from "./HTMLBuilder";
import {FiltersMenu} from "./filtersMenu/filters-menu";
import {ToysMenu} from './toysCards/toys-menu'
import {CSS_CLASS} from "./settings";
import {SearchField} from "./elements/search-field";
import {loadLocalStorage} from "./filtersMenu/filters-settings";
import {deleteSearchFieldAndBasket} from "./functions";
import {Basket} from "./elements/basket";
import {classCreator} from "./interfaces";

export class CreateToysPage extends HTMLBuilder {
    public init(): void {
        const body: HTMLElement | null = document.querySelector('body')
        if (body) {
            body.className = CSS_CLASS.toysPageFilters
        }

        const mainContainer: HTMLElement | null = document.querySelector('.main-container');
        const toysPage: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toysPage
        })

        const toysMenu: classCreator = new ToysMenu()
        const filtersMenu: classCreator = new FiltersMenu()

        toysPage.append(filtersMenu.create(), toysMenu.create())

        if (mainContainer) {
            mainContainer.innerHTML = '';
            mainContainer.append(toysPage)
        }

        deleteSearchFieldAndBasket()
        const basket: classCreator = new Basket()
        const searchField: classCreator = new SearchField()

        const headerContainer: HTMLElement | null = document.querySelector('.header-container');
        headerContainer?.append(searchField.create(), basket.create())

        loadLocalStorage()
    }
}
