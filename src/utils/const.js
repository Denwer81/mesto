// шаблон карточки
export const cardTemplateSelector = '.card-template';

// список карточек(контейнер)
export const cardsList = document.querySelector('.cards__list');

// кнопки открытия
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddCardButton = document.querySelector('.profile__add-card-btn');
export const profileAvatarButton = document.querySelector('.profile__image');

// popup
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');
export const popupOpenImage = document.querySelector('.popup_type_image');

// селекторы информации о пользователе на странице
export const userDataSelector = {
  userNameSelector: '.profile__user-name',
  userAboutSelector: '.profile__text',
  userAvatarSelector: '.profile__image'
};

// настройки валидации
export const validatorSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_hidden'
};

// настройки api
export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '78448b42-5868-45d9-8c17-5b242dddd810',
    'Content-Type': 'application/json'
  }
};