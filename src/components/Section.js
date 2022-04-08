export class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }
  
  renderItems(items) {
    items.forEach(dataCard => {
      this._renderer(dataCard);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}