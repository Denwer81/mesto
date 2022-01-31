enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  ErrorClass: 'popup__error_hidden'
});

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);
  
  forms.forEach((form) => {
    form.addEventListener('submit', submitForm);
    
    const inputs = form.querySelectorAll(inputSelector);
    
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validationInput(form, input, rest)
      });
    });
    disabledSubmitButton(form, rest);
  });
}

function submitForm(evt) {
  evt.preventDefault();
}

function validationInput(form, input, rest) {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  if (!input.validity.valid) {
    showError(input, errorMessage, rest);
  } else {
    hideError(input, errorMessage, rest);
  };

  disabledSubmitButton(form, rest);
}

function showError(input, errorMessage, { inputErrorClass, ErrorClass }) {
  input.classList.add(inputErrorClass);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.remove(ErrorClass);
}

function hideError(input, errorMessage, { inputErrorClass, ErrorClass }) {
  input.classList.remove(inputErrorClass);
  errorMessage.textContent = '';
  errorMessage.classList.add(ErrorClass);
}

function disabledSubmitButton(form, { submitButtonSelector, inactiveButtonClass }) {
  const submitButton = form.querySelector(submitButtonSelector);
  
  if (!form.checkValidity()) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  };
}