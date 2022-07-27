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

    describe('filtersSettings', function () {
        const data = JSON.parse('[{"num":"1","name":"Большой шар с рисунком","count":"2","year":"1960","shape":"шар","color":"желтый","size":"большой","favorite":false},{"num":"2","name":"Зелёный шар с цветами","count":"5","year":"2000","shape":"шар","color":"зелёный","size":"большой","favorite":false},{"num":"3","name":"Красный матовый шар","count":"3","year":"1990","shape":"шар","color":"красный","size":"большой","favorite":false},{"num":"4","name":"Сосулька красная","count":"2","year":"1980","shape":"фигурка","color":"красный","size":"большой","favorite":false},{"num":"5","name":"Красный виноград","count":"4","year":"1980","shape":"фигурка","color":"красный","size":"средний","favorite":true}]')
        it('year selection', function () {
            filtersSettings.yearMin = 1950
            filtersSettings.yearMax = 1960
            const expected = [
                {
                    color: 'желтый',
                    count: '2',
                    favorite: false,
                    name: 'Большой шар с рисунком',
                    num: '1',
                    shape: 'шар',
                    size: 'большой',
                    year: '1960'
                }
            ]

            assert.deepEqual(yearSelection(data), expected);

        });
        it('shape selection', function () {
            filtersSettings.shape = ['шар']
            const expected = [
                {
                    color: 'желтый',
                    count: '2',
                    favorite: false,
                    name: 'Большой шар с рисунком',
                    num: '1',
                    shape: 'шар',
                    size: 'большой',
                    year: '1960'
                },
                {
                    color: 'зелёный',
                    count: '5',
                    favorite: false,
                    name: 'Зелёный шар с цветами',
                    num: '2',
                    shape: 'шар',
                    size: 'большой',
                    year: '2000'
                },
                {
                    num: "3",
                    name: "Красный матовый шар",
                    count: "3",
                    year: "1990",
                    shape: "шар",
                    color: "красный",
                    size: "большой",
                    favorite: false
                }
            ]

            assert.deepEqual(shapeSelection(data), expected);
        });
        it('color selection', function () {
            filtersSettings.color = ['зелёный']
            const expected = [{
                color: 'зелёный',
                count: '5',
                favorite: false,
                name: 'Зелёный шар с цветами',
                num: '2',
                shape: 'шар',
                size: 'большой',
                year: '2000'
            }]

            assert.deepEqual(colorSelection(data), expected);
        });
        it('search selection', function () {
            filtersSettings.search = 'шар с цветами'
            const expected = [{
                color: 'зелёный',
                count: '5',
                favorite: false,
                name: 'Зелёный шар с цветами',
                num: '2',
                shape: 'шар',
                size: 'большой',
                year: '2000'
            }]
            assert.deepEqual(colorSelection(data), expected);
        });
        it('popular selection', function () {
            const expected = [{
                num: "5",
                name: "Красный виноград",
                count: "4",
                year: "1980",
                shape: "фигурка",
                color: "красный",
                size: "средний",
                favorite: true
            }]
            assert.deepEqual(popularSelection(data), expected);
        });
        it('size selection', function () {
            filtersSettings.size = ['средний']
            const expected = [{
                num: "5",
                name: "Красный виноград",
                count: "4",
                year: "1980",
                shape: "фигурка",
                color: "красный",
                size: "средний",
                favorite: true
            }]
            assert.deepEqual(sizeSelection(data), expected);
        });
        it('quantity selection', function () {
            filtersSettings.quantityMin = 5
            filtersSettings.quantityMax = 5
            const expected = [{
                num: "5",
                name: "Красный виноград",
                count: "4",
                year: "1980",
                shape: "фигурка",
                color: "красный",
                size: "средний",
                favorite: true
            }]
            assert.deepEqual(sizeSelection(data), expected);
        });
    });
})


