import './styles/SCSS/main.scss';
import {StartPage} from './ts/start-page';
import {CreateToysPage} from './ts/toys-page'
import {href, localStorageVariable} from "./ts/enum";
import {setFiltersSettings} from "./ts/filtersMenu/filters-settings";
import {showCurrentPage} from "./ts/functions";

const startPage = new StartPage()
startPage.init()

const toysPage = new CreateToysPage()

window.addEventListener('hashchange', (): void => {
    if (window.location.hash.slice(1) === href.startPage) {
        startPage.init()
        showCurrentPage('start')
    } else if (window.location.hash.slice(1) === href.toysPage) {
        showCurrentPage('toys')
        toysPage.init()
    } else if (window.location.hash.slice(1) === href.treePage) {
        showCurrentPage('toys')
        toysPage.init()
    }
})

window.onload = (): void => {
    window.location.hash = `#${href.startPage}`

    const settings = localStorage.getItem(localStorageVariable.settings)
    if (settings) {
        setFiltersSettings(JSON.parse(settings))
    }
}


