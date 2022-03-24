import sequoia from '../images/sequoia_park.jpg';
import sukko from '../images/sukko_lake.jpg';
import yosemite from '../images/yosemite_park.jpg';
import bigSur from '../images/big_sur.jpg';
import dubai from '../images/dubai.jpg';
import budapest from '../images/Budapest.jpg';


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
    link: sequoia
  },
  {
    name: 'Озеро сукко',
    link: sukko
  },
  {
    name: 'Парк Йосемити',
    link: yosemite
  },
  {
    name: 'Big Sur',
    link: bigSur
  },
  {
    name: 'Дубай',
    link: dubai
  },
  {
    name: 'Будапешт',
    link: budapest
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