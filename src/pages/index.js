import './index.css';

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api';

import {
  cardTemplateSelector,
  cardsList,
  profileEditButton,
  profileAddCardButton,
  profileAvatarButton,
  popupEditProfile,
  popupChangeAvatar,
  popupAddCard,
  popupDeleteCard,
  popupOpenImage,
  userDataSelector,
  validatorSetting,
  apiSettings,
} from "../utils/const.js";


// api экземпляр
const api = new Api(apiSettings);

// данные пользователя
const userInfo = new UserInfo(userDataSelector);

// экземпляр section
const section = new Section(renderCard, cardsList);

// popup экземпляры
const popupImage = new PopupWithImage(popupOpenImage);
const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitProfileForm);
const popupAvatar = new PopupWithForm(popupChangeAvatar, handleSubmitAvatarForm);
const popupCard = new PopupWithForm(popupAddCard, handleSubmitCardForm);
const popupDelete = new PopupWithForm(popupDeleteCard);

// валидация карточек
const formValidators = {};

const enableValidation = (validatorSetting) => {
  const formList = Array.from(document.querySelectorAll(validatorSetting.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(validatorSetting, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validatorSetting);

// инициализация профиля и карточек
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([usedData, cards]) => {
    userInfo.setUserInfo({
      userName: usedData.name,
      userAbout: usedData.about,
      userAvatar: usedData.avatar,
      userId: usedData._id
    });
    section.renderItems(cards.reverse());
  })
  .catch(err => console.log(err));

// создание и рендер карточки
function createCardHandler(dataCard) {
  const cardElement = new Card({
    dataCard,
    cardTemplateSelector,
    handleOpenImagePopup,
    handleOpenDeletePopup,
    handleCardLike,
    userId: userInfo.getUserId()
  });
  return cardElement.createCard();
}

function renderCard(dataCard) {
  const card = createCardHandler(dataCard);
  section.addItem(card);
}

// открытие профайла
profileEditButton.addEventListener('click', handleOpenProfilePopup);

function handleOpenProfilePopup() {
  const profileData = userInfo.getUserInfo();

  popupProfile.setInputValues(profileData);
  formValidators['edit-profile-form'].resetValidation();
  popupProfile.openPopup();
}

// отпраление формы профайла
function handleSubmitProfileForm(userData) {
  popupProfile.renderLoading('Сохранение...');
  api.editProfile(userData.userName, userData.userAbout)
    .then(res => {
      userInfo.setUserInfo({
        userName: res.name,
        userAbout: res.about,
      });
      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupProfile.renderLoading());
}

// открытие смены аватара
profileAvatarButton.addEventListener('click', handleOpenAvatarPopup);

function handleOpenAvatarPopup() {
  formValidators['change-avatar-form'].resetValidation();
  popupAvatar.openPopup();
}

// отправление формы смена аватара
function handleSubmitAvatarForm(link) {
  popupAvatar.renderLoading('Сохранение...');
  api.changeAvatar(link['avatar-image-url'])
    .then(res => {
      userInfo.setUserInfo({
        userAvatar: res.avatar
      });
      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatar.renderLoading());
}

// открытие попапа добавления карточки
profileAddCardButton.addEventListener('click', handleOpenCardPopup);

function handleOpenCardPopup() {
  formValidators['add-card-form'].resetValidation();
  popupCard.openPopup();
}

//отпраление формы добавления карточки
function handleSubmitCardForm(cardData) {
  popupCard.renderLoading('Сохранение...');
  api.addNewCard(cardData['data-image'], cardData['data-image-url'])
    .then(card => {
      renderCard(card);
      popupCard.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupCard.renderLoading());
}

// открытие попапа картинки
function handleOpenImagePopup(link, name) {
  popupImage.openPopup(link, name);
}

// открытие попапа удаления карточки
function handleOpenDeletePopup(card) {
  popupDelete.openPopup();
  popupDelete.setNewSubmitHandler(() => {
    handleSubmitDeleteForm(card);
  });
}

// удаление карточки
function handleSubmitDeleteForm(card) {
  popupDelete.renderLoading('Удаление...');
  api.deleteCard(card.id)
    .then((cardDelete) => {
      if (cardDelete) {
        card.deleteCard();
      }
      popupDelete.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupDelete.renderLoading());
}

// лайк карточки
function handleCardLike(id, isLiked) {
  api.likesCard(id, isLiked)
  .then(card => {
    this.setLikesCount(card);
    this.setHeartLike();
  })
  .catch(err => console.log(err));
}