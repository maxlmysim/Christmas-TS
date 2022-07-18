import {SliderCreator} from "./sliderCreator";
import {paramsToys} from "../../params-toys";
// import {filtersSettings} from "../filters-settings";


export class SliderQuantity extends SliderCreator {
    constructor() {
        super('quantity', paramsToys.minCount, paramsToys.maxCount, 1, 'Количество экземпляров');
    }


}

