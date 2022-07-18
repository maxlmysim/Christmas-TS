import './styles/SCSS/main.scss';
import {StartPage} from './ts/start-page';
import {CreateToysPage}  from './ts/toys-page'
import {href} from "./ts/enum";


const startPage = new StartPage()
startPage.init()

const toysPage = new CreateToysPage()

window.addEventListener('hashchange', () => {
    if (window.location.hash.slice(1) === href.startPage) {
        startPage.init()
    } else if (window.location.hash.slice(1) === href.toysPage) {
        toysPage.init()
    } else if (window.location.hash.slice(1) === href.treePage) {
        toysPage.init()
    }
})

window.onload = () => window.location.hash = `#${href.startPage}`


