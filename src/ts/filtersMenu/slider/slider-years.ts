import {SliderCreator} from "./sliderCreator";
import {paramsToys, sliderParams} from "../../settings";

export class SliderYears extends SliderCreator {
    public constructor() {
        super(sliderParams.years.name, paramsToys.minYear, paramsToys.maxYear, +sliderParams.years.step, sliderParams.years.text);
    }
}

