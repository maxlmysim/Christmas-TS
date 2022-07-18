import {HTMLBuilder} from "../HTMLBuilder";
import {ToyCardsCreator} from "./toy-cards-creator";
import {CSS_CLASS} from "../enum";
import {basket, changeNumberBasket, showMaxCapacityBasket} from "../basket";
import {capacityBasket} from "../constans";

export class ToysMenu extends HTMLBuilder {
    create(){
        const listCard: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toysCards
        })

        const toyCard = new ToyCardsCreator()

        listCard.append(...toyCard.createListCards())

        listCard.addEventListener('click', (event) => {
            const target = event.target as HTMLElement
            const card = target.closest(`.${CSS_CLASS.toyCard}`)
            if(card) {
                const id = card.getAttribute('id')
                if(id) {
                    if(basket.has(id)) {
                        basket.delete(id)
                        card.classList.remove(`${CSS_CLASS.toyCard}__${CSS_CLASS.basket}`)
                    } else if(basket.size >= capacityBasket){
                        showMaxCapacityBasket(event)
                        return
                    } else {
                        basket.add(id)
                        card.classList.add(`${CSS_CLASS.toyCard}__${CSS_CLASS.basket}`)
                    }

                    changeNumberBasket()
                }

            }
        })

        return listCard
    }

    init(){
        document.querySelector('.toys-cards')?.remove()
        document.querySelector('.toys-page')?.append(this.create())
    }
}