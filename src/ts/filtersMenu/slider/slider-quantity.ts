import {SliderCreator} from "./sliderCreator";
import {paramsToys, sliderParams} from "../../settings";


export class SliderQuantity extends SliderCreator {
    public constructor() {
        super(sliderParams.quantity.name, paramsToys.minCount, paramsToys.maxCount, +sliderParams.quantity.step, sliderParams.quantity.text);
    }
}

