import {HTMLBuilder} from "./HTMLBuilder";
import {FiltersMenu} from "./filtersMenu/filters-menu";
import {ToysMenu} from './toysCards/toys-menu'
import {CSS_CLASS} from "./enum";

export class CreateToysPage extends HTMLBuilder {
    init() {
        const body = document.querySelector('body')
        if (body) {
            body.className = CSS_CLASS.toysPageFilters
        }

        const mainContainer: HTMLElement | null = document.querySelector('.main-container');
        const toysPage: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toysPage
        })


        const toysMenu = new ToysMenu()
        const filtersMenu = new FiltersMenu()

        toysPage.append(filtersMenu.create(), toysMenu.create())

        if (mainContainer) {
            mainContainer.innerHTML = '';
            mainContainer.append(toysPage)
        }
        //
        //
        // window.addEventListener('click', () =>{
        //     console.log(filtersSettings)
        // })
    }
}
