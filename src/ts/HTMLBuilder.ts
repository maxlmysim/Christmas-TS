import createElementParams from "./interfaces";

class HTMLBuilder {
    createElement(params: createElementParams) {
        const elem = document.createElement(params.tag)

        if(params.className) elem.className = params.className
        if(params.textContent) elem.textContent = params.textContent
        if(params.id) elem.id = params.id
        if(params.href) (elem as HTMLLinkElement).href = params.href

        return elem
    }
}

export default HTMLBuilder