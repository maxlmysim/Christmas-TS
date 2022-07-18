import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "./filters-settings";

export class PopularSelect extends HTMLBuilder {
    create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__popular, popular',
        })

        const container = this.createElement({
            tag: 'div',
            className: 'checkbox-container',
        })

        const input = this.createElement({
            tag: 'input',
            className: '',
            type: 'checkbox',
            value: 'popular',
            id: 'popular',
            name: 'popular',
        })

        const label = this.createElement({
            tag: 'label',
            className: '',
            textContent: 'Популярные',
            for: 'popular',
        })

        container.append(input, label)

        container.addEventListener('change', (event) => {
            const elem: HTMLInputElement | null = (event.target as HTMLElement).closest("input[name=popular]")

            if (!elem) return;

            filtersSettings.popular = elem.checked;

            updateToys()
        })

        wrapper.append(container)

        return wrapper
    }
}