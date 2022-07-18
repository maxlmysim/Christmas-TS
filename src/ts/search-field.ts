import {HTMLBuilder} from "./HTMLBuilder";
import {filtersSettings, updateToys} from "./filtersMenu/filters-settings";

export class SearchField extends HTMLBuilder {
    create() {
        const searchField = this.createElement({
            tag: 'input',
            className: 'search-field',
            type: 'search',
            autofocus: true,
            placeholder: 'Поиск...'
        }) as HTMLInputElement

        searchField.addEventListener('input', () => {
            filtersSettings.search = searchField.value
            updateToys()
        })

        return searchField
    }
}