import data from "../data/data";
import {paramsToy} from "./interfaces";
import {colorsTranslate, sizeTranslate} from "./enum";

class GetParamsToys {
    public names: string[];
    public minCount: number;
    public maxCount: number;
    public minYear: number;
    public maxYear: number;
    public colors: ({ en: string, ru: string } | undefined)[];
    public size: ({ en: string, ru: string } | undefined)[];

    public constructor(data: paramsToy[]) {
        this.names = data.map(toy => toy.name)
        this.minCount = data.reduce((pre, cur) => +cur.count < pre ? +cur.count : pre, Infinity)
        this.maxCount = data.reduce((pre, cur) => +cur.count > pre ? +cur.count : pre, -Infinity)
        this.minYear = data.reduce((pre, cur) => +cur.year < pre ? +cur.year : pre, Infinity)
        this.maxYear = data.reduce((pre, cur) => +cur.year > pre ? +cur.year : pre, -Infinity)
        this.colors = Array.from(new Set(data.map(toy => colorsTranslate.find(color => toy.color === color.ru))))
        this.size = Array.from(new Set(data.map(toy => sizeTranslate.find(size => toy.size === size.ru))))
    }
}

export const paramsToys = new GetParamsToys(data)
