import {HTMLBuilder} from "./HTMLBuilder";
import {CSS_CLASS} from "./settings";
import {StartPage} from "./start-page";

export class CreateTreePage extends HTMLBuilder {
    public init(): void {
        const startPage = new StartPage()
        startPage.init()

        const helpText = document.querySelector(`.${CSS_CLASS.helpText}`)
        const buttonStart = document.querySelector(`.${CSS_CLASS.buttonStart}`)

        if (helpText) {
            helpText.textContent = 'В разработке...'
        }
        if (buttonStart) {
            buttonStart.textContent = 'Выбрать игрушки'
        }
    }
}
