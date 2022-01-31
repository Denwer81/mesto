enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_hidden'
});

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);
  
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      submitForm(evt, form, rest)
    });
    
    const inputs = form.querySelectorAll(inputSelector);
    
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validationInput(form, input, rest)
      });
    });
    toggleButtonState(form, rest);
  });
}

function submitForm(evt, form, { submitButtonSelector, inactiveButtonClass }) {
  evt.preventDefault();

  const submitButton = form.querySelector(submitButtonSelector);

  disableButton(submitButton, inactiveButtonClass);
}

function validationInput(form, input, rest) {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  if (!input.validity.valid) {
    showError(input, errorMessage, rest);
  } else {
    hideError(input, errorMessage, rest);
  };

  toggleButtonState(form, rest);
}

function showError(input, errorMessage, { inputErrorClass, errorClass }) {
  input.classList.add(inputErrorClass);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.remove(errorClass);
}

function hideError(input, errorMessage, { inputErrorClass, errorClass }) {
  input.classList.remove(inputErrorClass);
  errorMessage.textContent = '';
  errorMessage.classList.add(errorClass);
}

function toggleButtonState(form, { submitButtonSelector, inactiveButtonClass }) {
  const submitButton = form.querySelector(submitButtonSelector);
  
  if (!form.checkValidity()) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  };
}

function enableButton (submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
}