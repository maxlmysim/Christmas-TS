import {
    colorSelection,
    filtersSettings,
    popularSelection, sizeSelection,
    sortSelection,
    yearSelection
} from "../src/ts/filtersMenu/filters-settings";

var assert = require('assert');
const settings = require("../src/ts/settings");
const {shapeSelection} = require("../src/ts/filtersMenu/filters-settings")

if (typeof window === 'undefined') {
    localStorage.setItem('myCat', 'Tom');
}

describe('Settings', function () {
    describe('PathTo', function () {
        it('should return true  path', function () {
            assert.equal(settings.pathTo.getPathBasketImg(), 'url(./assets/svg/ball.svg)');
        });
        it('should return path to shape img', function () {
            for (let i = 0; i < 10; i++) {
                const name = String.fromCharCode(...new Array(10).fill(Math.floor(Math.random() * 200)))
                assert.equal(settings.pathTo.getPathShapeImg(name), `url(./assets/svg/${name}.svg)`);
            }
        });
        it('should return path to card img', function () {
            for (let i = 0; i < 10; i++) {
                const toyNum = Math.floor(Math.random() * 200)
                assert.equal(settings.pathTo.getPathCardImg(toyNum), `url(./assets/toys/${toyNum}.png)`);
            }
        });
    })

})


