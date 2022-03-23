// шаблон карточки
export const cardTemplate = '.card-template';

// список карточек(контейнер)
export const cardsList = document.querySelector('.cards__list');

// кнопки открытия
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddCardButton = document.querySelector('.profile__add-card-btn');

// селекторы информации о пользователе на странице
export const userDataSelector = {
  userNameSelector: '.profile__user-name',
  userAboutSelector: '.profile__text'
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

// данные карточек
export const initialCards = [{
    name: 'Национальный парк Секвойя',
    link: './images/sequoia_park.jpg'
  },
  {
    name: 'Озеро сукко',
    link: './images/sukko_lake.jpg'
  },
  {
    name: 'Парк Йосемити',
    link: './images/yosemite_park.jpg'
  },
  {
    name: 'Big Sur',
    link: './images/big_sur.jpg'
  },
  {
    name: 'Дубай',
    link: './images/dubai.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/Budapest.jpg'
  },
];

// настройки валидации
export const validatorSetting = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_hidden'
};