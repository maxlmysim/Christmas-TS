import './styles/SCSS/main.scss';
import {StartPage} from './ts/start-page';
import {CreateToysPage} from './ts/toys-page'
import {href, localStorageVariable} from "./ts/settings";
import {setFiltersSettings} from "./ts/filtersMenu/filters-settings";
import {highlightCurrentPage} from "./ts/functions";

const startPage = new StartPage()
startPage.init()

const toysPage = new CreateToysPage()

window.addEventListener('hashchange', (): void => {
    if (window.location.hash.slice(1) === href.startPage) {
        startPage.init()
        highlightCurrentPage('start')
    } else if (window.location.hash.slice(1) === href.toysPage) {
        highlightCurrentPage('toys')
        toysPage.init()
    } else if (window.location.hash.slice(1) === href.treePage) {
        highlightCurrentPage('toys')
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


