import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "./filters-settings";
import {checkboxName, CSS_CLASS, dataAttribute, paramsToys} from "../settings";

export class SizeSelector extends HTMLBuilder {
    public create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersSize}, ${CSS_CLASS.size}`,
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: `${CSS_CLASS.sizeName}, ${CSS_CLASS.filterName}`,
            textContent: 'Размер'
        })

        const sizeContainer: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersSizeContainer}`
        })

        const sizes: HTMLElement[] = paramsToys.size.map(size => {
            const container: HTMLElement = this.createElement({
                tag: 'div',
                className: `${CSS_CLASS.checkboxContainer}`,
            })

            const input: HTMLElement = this.createElement({
                tag: 'input',
                className: '',
                type: 'checkbox',
                name: checkboxName.size,
                value: size?.en,
                id: size?.en,
                data: `${dataAttribute.size}, ${size?.ru}`,
            })

            const label: HTMLElement = this.createElement({
                tag: 'label',
                className: '',
                for: size?.en,
                textContent: size?.ru
            })

            container.append(input, label)
            return container
        })

        sizeContainer.append(...sizes)

        sizeContainer.addEventListener('change', (event) => {
            const elem: HTMLInputElement | null = (event.target as HTMLElement).closest(`input[name=${checkboxName.size}]`)

            if (!elem) return;

            const atr: string | null = elem.getAttribute(dataAttribute.size)

            if (atr) {
                if (elem.checked) {
                    filtersSettings.size.push(atr)
                } else {
                    filtersSettings.size = filtersSettings.size.filter(name => name !== atr)
                }
            }

            updateToys()
        })

        wrapper.append(name, sizeContainer)

        return wrapper
    }
}
