import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "./filters-settings";
import {checkboxName, CSS_CLASS} from "../enum";

export class PopularSelect extends HTMLBuilder {
   public create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersPopular}, ${CSS_CLASS.popular}`,
        })

        const container: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.checkboxContainer}`,
        })

        const input: HTMLElement = this.createElement({
            tag: 'input',
            className: '',
            type: 'checkbox',
            value: checkboxName.popular,
            id: 'popular',
            name: checkboxName.popular,
        })

        const label: HTMLElement = this.createElement({
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