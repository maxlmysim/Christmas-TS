import {createElementParams} from "./interfaces";

export class HTMLBuilder {
   protected createElement(params: createElementParams): HTMLElement {
        const elem: HTMLElement = document.createElement(params.tag)

        if (params.className) {
            elem.classList.add(...params.className.split(', '))
        }
        if (params.textContent) elem.textContent = params.textContent
        if (params.id) elem.id = params.id
        if (params.href) (elem as HTMLLinkElement).href = params.href
        if (params.set) {
            elem.setAttribute(params.set.title, params.set.name)
        }
        if (params.backgroundImage) {
            elem.style.backgroundImage = params.backgroundImage
        }
        if (params.background) elem.style.background = params.background
        if (params.value) (elem as HTMLSelectElement).value = params.value
        if (params.selected) (elem as HTMLOptionElement).selected = params.selected
        if (params.name) (elem as HTMLInputElement).name = params.name
        if (params.for) (elem as HTMLLabelElement).htmlFor = params.for
        if (params.type) (elem as HTMLInputElement).type = params.type
        if (params.value) (elem as HTMLInputElement).value = params.value
        if (params.data) {
            const atr = params.data.split(', ')
            elem.setAttribute(atr[0], atr[1])
        }
        if (params.disabled) (elem as HTMLInputElement).disabled = true
        if (params.autofocus) (elem as HTMLInputElement).autofocus = true
        if (params.placeholder) (elem as HTMLInputElement).placeholder = params.placeholder

        return elem
    }
}