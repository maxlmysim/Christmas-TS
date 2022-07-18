import {HTMLBuilder} from "./HTMLBuilder";
import {CSS_CLASS} from "./enum";

let basketFromLocalStorage = localStorage.getItem('basket')
if (basketFromLocalStorage) {
    basketFromLocalStorage = JSON.parse(basketFromLocalStorage)
}

export const basket = new Set(basketFromLocalStorage)

export function resetBasket() {
    basket.clear()
    changeNumberBasket()
    const activeToys = document.querySelectorAll(`.${CSS_CLASS.toyCardBasket}`)

    activeToys.forEach(toy => toy.classList.remove(CSS_CLASS.toyCardBasket))
}

export function showMaxCapacityBasket(event: MouseEvent) {
    const popup = (new FullBasket()).create()
    popup.style.top = `${event.clientY}px`
    popup.style.left = `${event.clientX}px`

    document.body.append(popup)

    setTimeout(() => popup.remove(), 1000)
}

export function changeNumberBasket() {
    const num = document.querySelector(`.${CSS_CLASS.basketCount}`)
    if (num) {
        num.textContent = `${basket.size}`
    }
    saveLocalStorage()
}

function saveLocalStorage() {
    const arr = Array.from(basket)
    localStorage.setItem('basket', JSON.stringify(arr))
}

export class Basket extends HTMLBuilder {
    create() {
        const basket = this.createElement({
            tag: 'div',
            className: CSS_CLASS.basket,
            backgroundImage: 'url(./assets/svg/ball.svg)'
        })

        const count = this.createElement({
            tag: 'p',
            className: CSS_CLASS.basketCount,
            textContent: '0'
        })

        basket.append(count)

        return basket
    }
}

class FullBasket extends HTMLBuilder {
    create() {
        const popup = this.createElement({
            tag: 'div',
            className: CSS_CLASS.popup
        })

        const text = this.createElement({
            tag: 'p',
            className: CSS_CLASS.popupText,
            textContent: 'Извините, корзина полна'
        })

        popup.append(text)

        return popup
    }
}