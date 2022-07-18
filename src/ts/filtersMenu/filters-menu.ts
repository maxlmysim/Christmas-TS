import {HTMLBuilder} from "../HTMLBuilder";
import {SortSelection} from "./sort-selection";
import {ShapeSelection} from "./shape-selection"
import {SliderQuantity} from "./slider/slider-quantity";
import {SliderYears} from "./slider/slider-years";
import {ColorSelector} from "./color-selection";
import {SizeSelector} from "./size-selection";
import {PopularSelect} from "./popular-selection";
import {ButtonsSelector} from "./buttons";

export class FiltersMenu extends HTMLBuilder {
    create() {
        const filtersMenu: HTMLElement = this.createElement({
            tag: 'div',
            className: 'filters-menu, filters'
        })

        const selectors = [new SortSelection(), new ShapeSelection(), new SliderQuantity(), new SliderYears(), new ColorSelector(), new SizeSelector(), new PopularSelect(), new ButtonsSelector()]

        filtersMenu.append(...selectors.map(selector => selector.create()))

        return filtersMenu
    }
}