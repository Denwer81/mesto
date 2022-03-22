export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  
  renderItems() {
    this._items.forEach(dataCard => {
      const cardElement = this._renderer(dataCard);

      this.addItems(cardElement);
    });
  }

  addItems(card) {
    this._container.prepend(card);
  }
}