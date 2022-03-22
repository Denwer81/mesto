import {
  Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(current, submitFormFunc) {
    super(current);

    this._handleSubmitForm = submitFormFunc;
    this._form = this._current.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  setInputValues(userInfo) {
    this._inputs.forEach((input, index) => {
      input.value = userInfo[index];
    });
  }

  getInputValues() {
    return Array.from(this._inputs).map(item => item.value);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitForm);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}