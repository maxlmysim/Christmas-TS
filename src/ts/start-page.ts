import HTMLBuilder from "./HTMLBuilder";

class StartPage extends HTMLBuilder {
    start() {
        const helpWindow = this.createElement({
            tag: 'div',
            className: 'help-window'
        })
        const helpText = this.createElement({
            tag: 'div',
            className: 'help-text',
            textContent: 'Помогите бабушке нарядить елку'
        })

        const startButton = this.createElement({
            tag: 'a',
            className: 'btn-start',
            textContent: 'Начать',
            href: '#toys'
        })

        helpWindow.append(helpText)

        const mainContainer: HTMLElement | null = document.querySelector('.main-container');
        const startPage = this.createElement({
            tag: 'div',
            className: 'start-page'
        })

        startPage.append(helpWindow, startButton)
        mainContainer?.append(startPage)
    }
}

export default StartPage