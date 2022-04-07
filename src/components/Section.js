export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }
  
  renderItems() {
    this._items.forEach(dataCard => {
      this._renderer(dataCard);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}