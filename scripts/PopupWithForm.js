import {
  Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(currentPopup, submitForm) {
    super(currentPopup);

    this._submitForm = submitForm;
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const values = {};

    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

   _handleSubmitForm() {
    const data = this._getInputValues();

    this._submitForm(data);
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