export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
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
