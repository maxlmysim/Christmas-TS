import {HTMLBuilder} from "../HTMLBuilder";
import {ToyCardsCreator} from "./toy-cards-creator";
import {CSS_CLASS} from "../enum";

export class ToysMenu extends HTMLBuilder {
    create(){
        const listCard: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toysCards
        })

        const toyCard = new ToyCardsCreator()

        listCard.append(...toyCard.createListCards())
        return listCard
    }

    init(){
        document.querySelector('.toys-cards')?.remove()
        document.querySelector('.toys-page')?.append(this.create())
    }
}