export const colorsTranslate = [
    {en: 'yellow', ru: 'желтый'},
    {en: 'red', ru: 'красный'},
    {en: 'white', ru: 'белый'},
    {en: 'blue', ru: 'синий'},
    {en: 'green', ru: 'зелёный'}
]

export const sizeTranslate = [
    {en: 'big', ru: 'большой'},
    {en: 'medium', ru: 'средний'},
    {en: 'small', ru: 'малый'}
]

export const shapeTranslate = [
    {en: 'bell', ru: 'колокольчик'},
    {en: 'ball', ru: 'шар'},
    {en: 'cone', ru: 'шишка'},
    {en: 'snowflake', ru: 'снежинка'},
    {en: 'figure', ru: 'фигурка'},
]

export enum CSS_CLASS {
    filtersSort = 'filters__sort',
    sort = 'sort',
    sortName = 'sort__name',
    filterName = 'filter-name',
    sortSelection = 'sort__selection',
    sortSelectionOption = 'sort__selection-option',
    toysCards = 'toys-cards',
    toyCard = 'toy-card',
    toyCardBasket = 'toy-card__basket',
    toyCardName = 'toy-card__name',
    toyCardImg = 'toy-card__img',
    toyCardQuantity = 'toy-card__quantity',
    toyCardYear = 'toy-card__year',
    toyCardShape = 'toy-card__shape',
    toyCardColor = 'toy-card__color',
    toyCardSize = 'toy-card__size',
    toyCardPopular = 'toy-card__popular',
    mainBackground = 'main-bg',
    helpWindow = 'help-window',
    helpText = 'help-text',
    buttonStart = 'btn-start',
    startPage = 'start-page',
    toysPageFilters = 'toys-page-filters',
    toysPage = 'toys-page',
    filtersSlider = 'filters__slider',
    slider = 'slider',
    sliderName = 'slider__name',
    sliderPositionsHandler = 'slider__positions-handler',
    sliderPositionsHandlerMax = 'slider__positions-handler_max',
    sliderPositionsHandlerMin = 'slider__positions-handler_min',
    sliderRange = 'slider__range',
    shapeToy = 'shape__toy',
    colorsColor = 'colors__color',
    basket = 'basket',
    basketCount = 'basket__count',
    popup = 'popup',
    popupText = 'popup__text',
    filtersButtons = 'filters__buttons',
    filtersButton = 'filters__button',
    filtersButtonsReset = 'filters__button-reset',
    filtersButtonsClear = 'filters__button-clear',
    buttons = 'buttons',
    buttonsReset = 'buttons__reset',
    buttonsClear = 'buttons__clear',
    filtersColor = 'filters__color',
    colors = 'colors',
    colorName = 'color__name',
    filtersColorContainer = 'filters__color-container',
    active = 'active',
    anim = 'anim',
    hide = 'hide',
    filtersMenu = 'filters-menu',
    filters = 'filters',
    filtersPopular = 'filters__popular',
    popular = 'popular',
    checkboxContainer = 'checkbox-container',
    filtersShape = 'filters__shape',
    shape = 'shape',
    shapeName = 'shape__name',
    shapeList = 'shape__list',
    shapeImg = 'shape__img',
    filtersSize = 'filters__size',
    size = 'size',
    sizeName = 'size__name',
    filtersSizeContainer = 'filters__size-container',
    noResultsContainer = 'no-results__container',
    noResultsText = 'no-results__text',
    searchField = 'search-field',
}

export enum localStorageVariable {
    settings = 'settings',
    basket = 'basket'
}

export const pathTo = {
    getPathShapeImg: (name: string): string => `url(./assets/svg/${name}.svg)`,
    getPathCardImg: (toyNum: string): string => `url(./assets/toys/${toyNum}.png)`,
    getPathBasketImg: (): string => 'url(./assets/svg/ball.svg)',
}

export const sliderParams = {
    quantity: {
        name: 'quantity',
        text: 'Количество экземпляров',
        step: 1
    },
    years: {
        name: 'years',
        text: 'Год изготовления',
        step: 10
    }
}

export enum href {
    toysPage = 'toys-page',
    startPage = 'start-page',
    treePage = 'tree-page',
}

export enum dataAttribute {
    id = 'id',
    count = 'count',
    color = 'color',
    shape = 'shape',
    size = 'size'
}

export enum checkboxName {
    popular = 'popular',
    size = 'size'
}

export enum value {
    base = 'base',
    sortNameDown = 'sortNameDown',
    sortNameUp = 'sortNameUp',
    sortDateDown = 'sortDateDown',
    sortDateUp = 'sortDateUp'
}