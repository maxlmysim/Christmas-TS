export interface createElementParams {
    tag: string,
    className: string,
    textContent?: string,
    id?: string,
    href?: string,
    set?: {
        title: string,
        name: string,
    },
    background?: string,
    backgroundImage?: string,
    value?: string,
    selected?: boolean,
    for?: string,
    name?: string,
    type?: string,
    data?: string,
    disabled?: boolean,
    autofocus?: boolean,
    placeholder?: string
}

export interface paramsToy {
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean,
}

export interface paramsFilterSort {
    value: string,
    textContent: string,
    selected?: boolean,
    disabled?: boolean
}

export interface paramsFiltersSettings {
    sort: string,
    shape: string[],
    quantityMin: number,
    quantityMax: number,
    yearMin: number,
    yearMax: number,
    color: string[],
    size: string[],
    popular: boolean,
    search: string,
    basket: string[]
}

export interface classCreator {
    create(): HTMLElement
}

export interface classInitiator {
    init(): void
}

export interface createElement {
    createElement(params: createElementParams): HTMLElement
}

export interface filterSortInterface {
    value: string,
    textContent: string,
    disabled?: boolean,
    selected?: boolean
}