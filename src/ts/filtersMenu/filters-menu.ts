import {HTMLBuilder} from "../HTMLBuilder";
import {SortSelection} from "./sort-selection";
import {ShapeSelection} from "./shape-selection"
import {SliderQuantity} from "./slider/slider-quantity";
import {SliderYears} from "./slider/slider-years";
import {ColorSelector} from "./color-selection";
import {SizeSelector} from "./size-selection";
import {PopularSelect} from "./popular-selection";
import {ButtonsSelector} from "./buttons";
import {classCreator} from "../interfaces";
import {CSS_CLASS} from "../enum";

export class FiltersMenu extends HTMLBuilder implements classCreator {
    public create(): HTMLElement {
        const filtersMenu: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersMenu}, ${CSS_CLASS.filters}`
        })

        const selectors: classCreator[] = [new SortSelection(), new ShapeSelection(), new SliderQuantity(), new SliderYears(), new ColorSelector(), new SizeSelector(), new PopularSelect(), new ButtonsSelector()]

        filtersMenu.append(...selectors.map(selector => selector.create()))

        return filtersMenu
    }
}