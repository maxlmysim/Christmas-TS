import {HTMLBuilder} from "../HTMLBuilder";
import {paramsToys} from "../params-toys";
import {filtersSettings, updateToys} from "./filters-settings";

export class ColorSelector extends HTMLBuilder {
    create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__color, color',
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: 'color__name, filter-name',
            textContent: 'Цвет'
        })

        const colorBlocks: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__color-container'
        })

        const colors: HTMLElement[] = paramsToys.colors.map(color => this.createElement({
            tag: 'div',
            className: `color__color, filters__color_${color?.en}, color__color_${color?.en}`,
            data: `color, ${color?.ru}`
        }))

        colorBlocks.addEventListener('click', (event) => {
            const elem = (event.target as HTMLElement).closest('.color__color')

            if(!elem) return;

            elem.classList.toggle('active')
            const atr = elem.getAttribute('color')

            if (atr) {
                if (elem?.classList.contains('active')) {
                    filtersSettings.color.push(atr)
                } else {
                    filtersSettings.color = filtersSettings.color.filter(name => name !== atr)
                }
            }

            updateToys()
        })

        colorBlocks.append(...colors)
        wrapper.append(name, colorBlocks)

        return wrapper
    }
}