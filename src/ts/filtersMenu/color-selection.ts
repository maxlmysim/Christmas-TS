import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "./filters-settings";
import {classCreator} from "../interfaces";
import {CSS_CLASS, dataAttribute, paramsToys} from "../settings";

export class ColorSelector extends HTMLBuilder implements classCreator{
   public create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersColor}, ${CSS_CLASS.colors}`,
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: `${CSS_CLASS.colorName}, ${CSS_CLASS.filterName}`,
            textContent: 'Цвет'
        })

        const colorBlocks: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersColorContainer}`
        })

        const colors: HTMLElement[] = paramsToys.colors.map(color => this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.colorsColor}, ${CSS_CLASS.filtersColor}_${color?.en}, ${CSS_CLASS.colorsColor}_${color?.en}`,
            data: `${dataAttribute.color}, ${color?.ru}`
        }))

        colorBlocks.addEventListener('click', (event) => {
            const elem = (event.target as HTMLElement).closest('.colors__color')

            if(!elem) return;

            elem.classList.toggle(CSS_CLASS.active)
            const atr = elem.getAttribute(dataAttribute.color)

            if (atr) {
                if (elem?.classList.contains(CSS_CLASS.active)) {
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