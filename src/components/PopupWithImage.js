import {
  Popup
} from './Popup.js';


export class PopupWithImage extends Popup {
  constructor(currentPopup) {
    super(currentPopup);
    
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__image-text');
  }

  openPopup(link, name) {
    super.openPopup();

    this._image.src = '';
    this._image.src = link;
    this._image.alt = `Фото ${name}`;
    this._text.textContent = name;
  }
}