class FormValidator {
  constructor(setting, form) {
    this._setting = setting;
    this._form = form;
    this._submitButton = this._form
      .querySelector(this._setting.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListener();
    this.toggleButtonState();
  }

  _setEventListener() {
    const inputs = this._form.querySelectorAll(this._setting.inputSelector);

    this._form.addEventListener('submit', (evt) => {
      this._submitForm(evt);
    });

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validationInput(input);
      });
    });
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._disableButton();
  }

  _validationInput(input) {
    this._errorMessage = this._form.querySelector(`#${input.id}-error`);
    
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }

    this.toggleButtonState();
  }

  _showError(input) {
    input.classList.add(this._setting.inputErrorClass);
    this._errorMessage.textContent = input.validationMessage;
    this._errorMessage.classList.remove(this._setting.errorClass);
  }

  _hideError(input) {
    input.classList.remove(this._setting.inputErrorClass);
    this._errorMessage.textContent = '';
    this._errorMessage.classList.add(this._setting.errorClass);
  }

  toggleButtonState() {
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