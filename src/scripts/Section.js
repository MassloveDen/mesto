export class Section {
    constructor({ items, renderer }, containerSelector) {
        
        this._renderItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element)
    }

    renderCards() {
        this._renderItems.forEach((element) => {
            this._renderer(element)
        });
    }
}