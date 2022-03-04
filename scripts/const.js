import {
  FormValidator
} from "./FormValidator.js";

// шаблон карточки
const cardTemplate = '.card-template';

// список карточек
const cardsList = document.querySelector('.cards__list');

// popup
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

// кнопки popup
const popupClosedButtons = document.querySelectorAll('.popup__closed-btn');

// кнопки открытия
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddCardButton = document.querySelector('.profile__add-card-btn');

// информация о пользователе на странице
const profileUserName = document.querySelector('.profile__user-name');
const profileText = document.querySelector('.profile__text');

// форма заполнения профиля 
const popupFormEdit = document.querySelector('.popup__form_type_edit-profile');
const profileFormName = popupFormEdit.querySelector('.popup__input_data_name');
const profileFormJob = popupFormEdit.querySelector('.popup__input_data_job');

// форма добавления карточки
const popupFormAdd = document.querySelector('.popup__form_type_add-card');
const formAddPlace = popupFormAdd.querySelector('.popup__input_data_place');
const formAddLink = popupFormAdd.querySelector('.popup__input_data_link');

// popup открытия картинки
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__image-text');

// данные карточек
const initialCards = [{
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
const validatorSetting = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saved-btn',
  inactiveButtonClass: 'popup__saved-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_hidden'
};

// валидация карточек
const formProfileValidation = new FormValidator(validatorSetting, popupFormEdit);
const formAddCardValidation = new FormValidator(validatorSetting, popupFormAdd);


export {
  initialCards,
  cardTemplate,
  cardsList,
  popupEditProfile,
  popupAddCard,
  popupClosedButtons,
  profileEditButton,
  profileAddCardButton,
  profileUserName,
  profileText,
  popupFormEdit,
  profileFormName,
  profileFormJob,
  popupFormAdd,
  formAddPlace,
  formAddLink,
  validatorSetting,
  popupImage,
  popupCardImage,
  popupImageText,
  formProfileValidation,
  formAddCardValidation
};