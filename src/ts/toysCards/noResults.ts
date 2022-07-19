import {HTMLBuilder} from "../HTMLBuilder";
import {CSS_CLASS} from "../settings";

export class NoResults extends HTMLBuilder {
    public create = (): HTMLElement => {
        const container: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.noResultsContainer,
        })

        const text: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.noResultsText,
            textContent: 'Ничего не найдено'
        })

        container.append(text)
        return container
    }
}