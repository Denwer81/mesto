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
  userDataSelector
} from "./const.js";

import {
  Section
} from "./Section.js";

import {
  Card
} from "./Card.js";

import {
  PopupWithForm
} from "./PopupWithForm.js";

import {
  PopupWithImage
} from "./PopupWithImage.js";

import {
  UserInfo
} from "./UserInfo.js";

import {
  FormValidator
} from './FormValidator.js';


// инициализация карточек
const renderCard = new Section({ items: initialCards, renderer }, cardsList);
renderCard.renderItems();

// рендер карточки
function renderer(dataCard) {
  const cardElement = new Card(dataCard, cardTemplate);
  const card = cardElement.createCard();

  return card;
}

// валидация карточек
const formProfileValidation = new FormValidator(validatorSetting, popupFormEdit);
const formAddCardValidation = new FormValidator(validatorSetting, popupFormAdd);

formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();

//открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();

  popupProfile.setInputValues(profileData);
  formProfileValidation.resetValidation();
  popupProfile.openPopup();
}

// отпраление формы профайла
function submitProfileForm() {
  const formData = popupProfile.getInputValues();

  userInfo.setUserInfo(formData);
  popupProfile.closePopup();
}

//открытие попапа добавления карточки
profileAddCardButton.addEventListener('click', openAddCardPopup);

function openAddCardPopup() {
  formAddCardValidation.resetValidation();
  popupCard.openPopup();
}

//отпраление формы добавления карточки
function SubmitAddCard() {
  const addCardData = popupCard.getInputValues();

  renderCard(addCardData, cardsList).addItem();
  popupCard.closePopup();
}

// открытие попапа картинки
function openImagePopup(link, name) {
  popupWithImage.openPopup(link, name);
}

// popup экземпляры
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
const popupCard = new PopupWithForm(popupAddCard, SubmitAddCard);

// данные пользователя
const userInfo = new UserInfo(userDataSelector);



export {
  openImagePopup,
};