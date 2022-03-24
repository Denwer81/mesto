export class FormValidator {
  constructor({
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }, form) {
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._inputs = this._form.querySelectorAll(inputSelector);
  }

  enableValidation() {
    this._setEventListener();
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  _setEventListener() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validationInput(input);
      });
    });
  }

  _validationInput(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }

    this._toggleButtonState();
  }

  _showError(input) {
    this._errorMessage = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = input.validationMessage;
    this._errorMessage.classList.remove(this._errorClass);
  }

  _hideError(input) {
    this._errorMessage = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = '';
    this._errorMessage.classList.add(this._errorClass);
  }

  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }
}