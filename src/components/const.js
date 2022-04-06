// шаблон карточки
export const cardTemplate = '.card-template';

// список карточек(контейнер)
export const cardsList = document.querySelector('.cards__list');

// кнопки открытия
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddCardButton = document.querySelector('.profile__add-card-btn');
export const profileAvatar = document.querySelector('.profile__image');


// селекторы информации о пользователе на странице
export const userDataSelector = {
  userNameSelector: '.profile__user-name',
  userAboutSelector: '.profile__text',
  userAvatarSelector: '.profile__image'
};

// форма заполнения профиля
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupFormEdit = popupEditProfile.querySelector('.popup__form_type_edit-profile');
export const profileFormName = popupFormEdit.querySelector('.popup__input_data_name');
export const profileFormJob = popupFormEdit.querySelector('.popup__input_data_job');

// форма добавления карточки
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupFormAdd = popupAddCard.querySelector('.popup__form_type_add-card');

// popup открытия картинки
export const popupImage = document.querySelector('.popup_type_image');

// popup удаления карточки
export const popupDelete = document.querySelector('.popup_type_delete-card');

// popup измененя аватара
export const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const popupFormChangeAvatar = popupChangeAvatar.querySelector('.popup__form_type_change-avatar');

// настройки валидации
export const validatorSetting = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_hidden'
};

// настройки api
export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  authorization: '78448b42-5868-45d9-8c17-5b242dddd810',
};