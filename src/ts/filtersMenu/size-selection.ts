import {HTMLBuilder} from "../HTMLBuilder";
import {paramsToys} from "../params-toys";
import {filtersSettings, updateToys} from "./filters-settings";

export class SizeSelector extends HTMLBuilder {
    create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__size, size',
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: 'size__name, filter-name',
            textContent: 'Размер'
        })

        const sizeContainer: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__size-container'
        })

        const sizes: HTMLElement[] = paramsToys.size.map(size => {
            const container = this.createElement({
                tag: 'div',
                className: 'checkbox-container',
            })

            const input = this.createElement({
                tag: 'input',
                className: '',
                type: 'checkbox',
                name: 'size',
                value: size?.en,
                id: size?.en,
                data: `size, ${size?.ru}`,
            })

            const label = this.createElement( {
                tag: 'label',
                className: '',
                for: size?.en,
                textContent: size?.ru
            })

            container.append(input, label)
            return container
        })

        sizeContainer.append(...sizes)

        sizeContainer.addEventListener('change', (event) =>{
            const elem: HTMLInputElement | null = (event.target as HTMLElement).closest("input[name=size]")

            if(!elem) return;

            const atr = elem.getAttribute('size')

            if (atr) {
                if (elem.checked) {
                    filtersSettings.size.push(atr)
                } else {
                    filtersSettings.size = filtersSettings.size.filter(name => name !== atr)
                }
            }

            updateToys()
        })

        wrapper.append(name,sizeContainer)

        return wrapper
    }
}