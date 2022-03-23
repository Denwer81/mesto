export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
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