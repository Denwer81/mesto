import {
  popupCardImage,
  popupImageText,
} from './const.js';

import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(current) {
    super(current);
  }

  openPopup(link, name) {
    super.openPopup();

    popupCardImage.src = '';
    popupCardImage.src = link;
    popupCardImage.alt = `Фото ${name}`;
    popupImageText.textContent = name;
  }
}