import {SliderCreator} from "./sliderCreator";
import {paramsToys} from "../../params-toys";

export class SliderYears extends SliderCreator {
    constructor() {
        super('years', paramsToys.minYear, paramsToys.maxYear, 10, 'Год изготовления');
    }
}

