import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import '../../../styles/SCSS/components/_sliders.scss';
import {HTMLBuilder} from '../../HTMLBuilder';
import {API} from "nouislider";
import {filtersSettings, updateToys} from "../filters-settings";
import {CSS_CLASS, sliderParams} from "../../enum";
import {classCreator} from "../../interfaces";


export class SliderCreator extends HTMLBuilder implements classCreator{
    protected constructor(protected nameSlider: string, protected min: number, protected max: number, protected step: number, protected textContent: string) {
        super();
        this.nameSlider = nameSlider;
        this.min = min;
        this.max = max;
        this.step = step;
        this.textContent = textContent;
    }

    public create(): HTMLElement {
        const sliderBlock: HTMLElement = this.createElement({
            tag: 'div',
            className: `${CSS_CLASS.filtersSlider}-${this.nameSlider}, ${CSS_CLASS.slider}`,
        })

        const sliderName: HTMLElement = this.createElement({
            tag: 'p',
            className: `${CSS_CLASS.sliderName}, ${CSS_CLASS.filterName}`,
            textContent: this.textContent
        })

        const positionsHandler: HTMLElement = this.createElement({
            tag: 'div',
            className: CSS_CLASS.sliderPositionsHandler,
        })

        const handlerOne: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.sliderPositionsHandlerMin,
            textContent: `${this.min}`
        })

        const handlerSecond: HTMLElement = this.createElement({
            tag: 'p',
            className: CSS_CLASS.sliderPositionsHandlerMax,
            textContent: `${this.max}`
        })

        const slider = this.createElement({
            tag: 'div',
            className: CSS_CLASS.sliderRange,
        }) as noUiSlider.target

        positionsHandler.append(handlerOne, handlerSecond)
        sliderBlock.append(sliderName, slider, positionsHandler)

        let minValue: number = this.min
        let maxValue: number = this.max

        if (this.nameSlider === sliderParams.quantity.name) {
            if (filtersSettings.quantityMin !== -Infinity &&
                filtersSettings.quantityMin) {
                minValue = filtersSettings.quantityMin
            }
            if (filtersSettings.quantityMax !== Infinity &&
                filtersSettings.quantityMax) {
                maxValue = filtersSettings.quantityMax
            }
        } else if (this.nameSlider === sliderParams.years.name) {
            if (filtersSettings.yearMin !== -Infinity &&
                filtersSettings.yearMin) {
                minValue = filtersSettings.yearMin
            }
            if (filtersSettings.yearMax !== Infinity &&
                filtersSettings.yearMax) {
                maxValue = filtersSettings.yearMax
            }
        }

        const ui: API = noUiSlider.create(slider, {
            range: {
                'min': [this.min],
                'max': [this.max],
            },
            step: this.step,
            start: [minValue, maxValue],
            connect: true,
        });

        ui.on('update', (values: (number | string)[]) => {
            handlerOne.textContent = `${Number(values[0]).toFixed()}`
            handlerSecond.textContent = `${Number(values[1]).toFixed()}`

            if (this.nameSlider === sliderParams.quantity.name) {
                filtersSettings.quantityMin = +Number(values[0]).toFixed()
                filtersSettings.quantityMax = +Number(values[1]).toFixed()
            } else if (this.nameSlider === sliderParams.years.name) {
                filtersSettings.yearMin = +Number(values[0]).toFixed()
                filtersSettings.yearMax = +Number(values[1]).toFixed()
            }

            updateToys()
        });

        return sliderBlock
    }
}

