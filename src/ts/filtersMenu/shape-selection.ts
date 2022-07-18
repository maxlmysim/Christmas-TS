import {HTMLBuilder} from "../HTMLBuilder";
import * as constants from "../constans";
import {filtersSettings, updateToys} from "./filters-settings";

export class ShapeSelection extends HTMLBuilder {
    create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters__shape, shape',
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: 'shape__name, filter-name',
            textContent: 'ФОРМА'
        })

        const shapeList: HTMLElement = this.createElement({
            tag: 'div',
            className: 'shape__list',
        })

        shapeList.append(...constants.filterShape.map((elem) => {
            const shape = this.createElement({
                tag: 'div',
                className: `shape__${elem.name}, shape__toy`,
                data: `shape, ${elem.textContent}`
            })

            const img = this.createElement({
                tag: 'div',
                className: 'shape__img',
                backgroundImage: `url(./assets/svg/${elem.name}.svg)`
            })

            const name = this.createElement({
                tag: 'p',
                className: 'shape__name',
                textContent: elem.textContent,
            })

            shape.append(img, name)

            return shape
        }))

        shapeList.addEventListener('click', event => {
            const elem = (event.target as HTMLElement).closest('.shape__toy')

            if(!elem) return;

            elem.classList.toggle('active')
            const atr = elem.getAttribute('shape')

            if (atr) {
                if (elem.classList.contains('active')) {
                    filtersSettings.shape.push(atr)
                } else {
                    filtersSettings.shape = filtersSettings.shape.filter(name => name !== atr)
                }
            }

            updateToys()
        })

        wrapper.append(name, shapeList)

        return wrapper
    }
}