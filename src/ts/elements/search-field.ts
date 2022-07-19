import {HTMLBuilder} from "../HTMLBuilder";
import {filtersSettings, updateToys} from "../filtersMenu/filters-settings";
import {CSS_CLASS} from "../settings";

export class SearchField extends HTMLBuilder {
    public create(): HTMLElement {
        const searchField = this.createElement({
            tag: 'input',
            className: CSS_CLASS.searchField,
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