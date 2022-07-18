import {HTMLBuilder} from "./HTMLBuilder";
import {CSS_CLASS, href} from "./enum";
import {deleteSearchFieldAndBasket} from "./functions";

export class StartPage extends HTMLBuilder {
    init() {
        const body = document.querySelector('body')
        if (body) {
            body.className = CSS_CLASS.mainBackground
        }

        const helpWindow = this.createElement({
            tag: 'div',
            className: CSS_CLASS.helpWindow
        })
        const helpText = this.createElement({
            tag: 'div',
            className: CSS_CLASS.helpText,
            textContent: 'Выбери себе игрушки на елку'
        })

        const startButton = this.createElement({
            tag: 'a',
            className: CSS_CLASS.buttonStart,
            textContent: 'Начать',
            href: `#${href.toysPage}`
        })

        helpWindow.append(helpText)

        const mainContainer: HTMLElement | null = document.querySelector('.main-container');
        const startPage = this.createElement({
            tag: 'div',
            className: CSS_CLASS.startPage
        })

        startPage.append(helpWindow, startButton)
        if (mainContainer) {
            mainContainer.innerHTML = ''
            mainContainer.append(startPage)
        }

        deleteSearchFieldAndBasket()
    }
}