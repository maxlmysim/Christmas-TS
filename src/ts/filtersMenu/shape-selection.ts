import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "./filters-settings";
import {CSS_CLASS, dataAttribute, filterShape, pathTo} from "../settings";

export class ShapeSelection extends HTMLBuilder {
    public create(): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersShape}, ${CSS_CLASS.shape}`,
        })

        const name: HTMLElement = this.createElement({
            tag: 'p',
            className: `${CSS_CLASS.shapeName}, ${CSS_CLASS.filterName}`,
            textContent: 'ФОРМА'
        })

        const shapeList: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.shapeList}`,
        })

        shapeList.append(...filterShape.map((elem) => {
            const shape: HTMLElement = this.createElement({
                tag: 'div',
                className: `${CSS_CLASS.shape}__${elem.name}, ${CSS_CLASS.shapeToy}`,
                data: `${dataAttribute.shape}, ${elem.textContent}`
            })

            const img: HTMLElement = this.createElement({
                tag: 'div',
                className: CSS_CLASS.shapeImg,
                backgroundImage: pathTo.getPathShapeImg(elem.name)
            })

            const name: HTMLElement = this.createElement({
                tag: 'p',
                className: CSS_CLASS.shapeName,
                textContent: elem.textContent,
            })

            shape.append(img, name)

            return shape
        }))

        shapeList.addEventListener('click', event => {
            const elem: HTMLElement | null = (event.target as HTMLElement).closest('.shape__toy')

            if (!elem) return;

            elem.classList.toggle(CSS_CLASS.active)
            const atr: string | null = elem.getAttribute(dataAttribute.shape)

            if (atr) {
                if (elem.classList.contains(CSS_CLASS.active)) {
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