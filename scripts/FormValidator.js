class FormValidator {
  constructor(setting, form) {
    this._setting = setting;
    this._form = form;
    this._submitButton = this._form
      .querySelector(this._setting.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListener();
    this._toggleButtonState();
  }

  _setEventListener() {
    const inputs = this._form.querySelectorAll(this._setting.inputSelector);

    this._form.addEventListener('submit', (evt) => {
      this._submitForm(evt);
    });

    inputs.forEach((input) => {
      const errorMessage = this._form.querySelector(`#${input.id}-error`);

      this._hideError(input, errorMessage);

      input.addEventListener('input', () => {
        this._validationInput(input, errorMessage);
      });
    });
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._disableButton();
  }

  _validationInput(input, errorMessage) {
    if (!input.validity.valid) {
      this._showError(input, errorMessage);
    } else {
      this._hideError(input, errorMessage);
    }

    this._toggleButtonState();
  }

  _showError(input, errorMessage) {
    input.classList.add(this._setting.inputErrorClass);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.remove(this._setting.errorClass);
  }

  _hideError(input, errorMessage) {
    input.classList.remove(this._setting.inputErrorClass);
    errorMessage.textContent = '';
    errorMessage.classList.add(this._setting.errorClass);
  }

  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _enableButton() {
    this._submitButton.classList.remove(this._setting.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _disableButton() {
    this._submitButton.classList.add(this._setting.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }
}

export {
  FormValidator
};