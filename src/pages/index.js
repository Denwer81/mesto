import './index.css';

import {
  initialCards,
  cardTemplate,
  profileEditButton,
  profileAddCardButton,
  cardsList,
  validatorSetting,
  popupFormEdit,
  popupFormAdd,
  popupImage,
  popupEditProfile,
  popupAddCard,
  userDataSelector,
  profileFormName,
  profileFormJob
} from "../components/const.js";

import {
  Section
} from "../components/Section.js";

import {
  Card
} from "../components/Card.js";

import {
  PopupWithForm
} from "../components/PopupWithForm.js";

import {
  PopupWithImage
} from "../components/PopupWithImage.js";

import {
  UserInfo
} from "../components/UserInfo.js";

import {
  FormValidator
} from '../components/FormValidator.js';


// инициализация карточек
const section = new Section({ items: initialCards, renderer }, cardsList);

section.renderItems();

// popup экземпляры
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
const popupCard = new PopupWithForm(popupAddCard, handleSubmitForm);

// данные пользователя
const userInfo = new UserInfo(userDataSelector);

// валидация карточек
const formProfileValidation = new FormValidator(validatorSetting, popupFormEdit);
const formAddCardValidation = new FormValidator(validatorSetting, popupFormAdd);

formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();

// рендер карточки
function renderer(dataCard) {
  const cardElement = new Card(dataCard, cardTemplate, openImagePopup);
  const card = cardElement.createCard();

  section.addItem(card);
}

//открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();

  profileFormName.value = profileData.userName;
  profileFormJob.value = profileData.userAbout;

  formProfileValidation.resetValidation();
  popupProfile.openPopup();
}

// отпраление формы профайла
function submitProfileForm(userData) {
  userInfo.setUserInfo({
    userName: userData.name,
    userAbout: userData.job
  });

  popupProfile.closePopup();
}

//открытие попапа добавления карточки
profileAddCardButton.addEventListener('click', openAddCardPopup);

function openAddCardPopup() {
  formAddCardValidation.resetValidation();
  popupCard.openPopup();
}

//отпраление формы добавления карточки
function handleSubmitForm(cardData) {
  renderer({
    name: cardData['data-image'],
    link: cardData['data-image-url']
  });

  popupCard.closePopup();
}

// открытие попапа картинки
function openImagePopup(link, name) {
  popupWithImage.openPopup(link, name);
}