export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addCard(element) {
    this._container.append(element);
  }

  prependCard(element) {
    this._container.prepend(element);
  }

  renderCards(cards) {
    cards.forEach(this._renderer);
  }
}
