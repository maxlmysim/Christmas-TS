import {HTMLBuilder} from "../HTMLBuilder";
import {CSS_CLASS, localStorageVariable, pathTo} from "../settings";

export class Basket extends HTMLBuilder {
    public create(): HTMLElement {
        const basket: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.basket,
            backgroundImage: pathTo.getPathBasketImg()
        })

        const count: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.basketCount,
            textContent: '0'
        })

        basket.append(count)

        return basket
    }

    public full(): HTMLElement {
        const popup: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.popup
        })

        const text: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.popupText,
            textContent: 'Извините, корзина полна'
        })

        popup.append(text)

        return popup
    }
}

let basketFromLocalStorage: string | null = localStorage.getItem(localStorageVariable.basket)
if (basketFromLocalStorage) {
    basketFromLocalStorage = JSON.parse(basketFromLocalStorage)
}

export const basket: Set<string> = new Set(basketFromLocalStorage)

export function resetBasket(): void {
    basket.clear()
    changeNumberBasket()
    const activeToys = Array.from(document.querySelectorAll(`.${CSS_CLASS.toyCardBasket}`)) as HTMLElement[]

    activeToys.forEach(toy => toy.classList.remove(CSS_CLASS.toyCardBasket))

    localStorage.removeItem(localStorageVariable.basket)
}

export function showMaxCapacityBasket(event: MouseEvent): void {
    const popup: HTMLElement = (new Basket()).full()
    popup.style.top = `${event.clientY}px`
    popup.style.left = `${event.clientX}px`

    if (!document.querySelector('.popup')) {
        document.body.append(popup)

        setTimeout(() => popup.remove(), 1000)
    }
}

export function changeNumberBasket(): void {
    const num: HTMLElement | null = document.querySelector(`.${CSS_CLASS.basketCount}`)
    if (num) {
        num.textContent = `${basket.size}`
    }
    saveLocalStorage()
}

function saveLocalStorage(): void {
    const arr: string[] = Array.from(basket)
    localStorage.setItem(localStorageVariable.basket, JSON.stringify(arr))
}
