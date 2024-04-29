class Button {
    constructor(buttonText, onClick) {
        this.buttonText = buttonText;
        this.onClick = onClick;
        this.buttonElement = this.createButton();
    }

    createButton() {
        const button = document.createElement('button');
        button.textContent = this.buttonText;
        button.addEventListener('click', this.onClick);
        return button;
    }

    render() {
        return this.buttonElement;
    }
}
