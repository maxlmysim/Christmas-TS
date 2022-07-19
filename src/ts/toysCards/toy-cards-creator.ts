import data from "../../data/data";
import {HTMLBuilder} from "../HTMLBuilder";
import {paramsToy} from "../interfaces"
import {sortSelection} from "../filtersMenu/filters-settings";
import {CSS_CLASS, dataAttribute, pathTo} from "../enum";


class ToyCardCreator extends HTMLBuilder {
    protected createCard(paramsToy: paramsToy): HTMLElement {
        const card: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toyCard,
            set: {
                title: dataAttribute.id,
                name: paramsToy.num
            }
        })
        card.setAttribute(dataAttribute.count, paramsToy.count)

        const cardName: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardName,
            textContent: paramsToy.name
        })

        const cardImg: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.toyCardImg,
            backgroundImage: pathTo.getPathCardImg(paramsToy.num)
        })

        const cardQuantity: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardQuantity,
            textContent: `Количество: ${paramsToy.count}`
        })

        const cardYear: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardYear,
            textContent: `Год покупки: ${paramsToy.year} год`
        })

        const cardShape: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardShape,
            textContent: `Форма игрушки: ${paramsToy.shape}`
        })

        const cardColor: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardColor,
            textContent: `Цвет игрушки: ${paramsToy.color}`
        })

        const cardSize: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardSize,
            textContent: `Размер игрушки: ${paramsToy.size}`
        })

        const cardPopular: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.toyCardPopular,
            textContent: `Популярная: ${paramsToy.favorite ? 'да' : 'нет'}`
        })

        card.append(cardName, cardImg, cardQuantity, cardYear, cardShape, cardColor, cardSize, cardPopular)

        return card
    }
}

export class ToyCardsCreator extends ToyCardCreator {
    public createListCards(): HTMLElement[] {
        const sortData = sortSelection(data)
        return sortData.map(toy => this.createCard(toy))
    }
}
