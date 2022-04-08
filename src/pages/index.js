import './index.css';

import {
  cardTemplate,
  cardsList,
  profileEditButton,
  profileAddCardButton,
  profileAvatarButton,
  popupImage,
  popupEditProfile,
  popupAddCard,
  popupDelete,
  popupChangeAvatar,
  userDataSelector,
  validatorSetting,
  apiSettings,
} from "../utils/const.js";

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

import {
  Api
} from '../components/Api';


// api экземпляр
const api = new Api(apiSettings);

// данные пользователя
const userInfo = new UserInfo(userDataSelector);

// экземпляр section
const section = new Section(renderCard, cardsList);

// popup экземпляры
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
const popupAvatar = new PopupWithForm(popupChangeAvatar, submitAvatarForm);
const popupCard = new PopupWithForm(popupAddCard, handleSubmitForm);
const popupDeleteCard = new PopupWithForm(popupDelete);

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
let userId = '';

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([usedData, cards]) => {
    userId = usedData._id;
    userInfo.setUserAvatar(usedData.avatar);
    userInfo.setUserInfo({
      userName: usedData.name,
      userAbout: usedData.about,
    });
    section.renderItems(cards.reverse());
  })
  .catch(err => console.log(err));

// создание и рендер карточки
function createCardHandler(dataCard) {
  const cardElement = new Card(dataCard, cardTemplate, openImagePopup, openDeleteCard, cardLike, userId);
  return cardElement.createCard();
}

function renderCard(dataCard) {
  const card = createCardHandler(dataCard);
  section.addItem(card);
}

// открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();

  popupProfile.setInputValues(profileData);
  formValidators['edit-profile-form'].resetValidation();
  popupProfile.openPopup();
}

// отпраление формы профайла
function submitProfileForm(userData) {
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
profileAvatarButton.addEventListener('click', openChangeAvatarPopup);

function openChangeAvatarPopup() {
  formValidators['change-avatar-form'].resetValidation();
  popupAvatar.openPopup();
}

// отправление формы смена аватара
function submitAvatarForm(link) {
  popupAvatar.renderLoading('Сохранение...');
  api.changeAvatar(link['avatar-image-url'])
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatar.renderLoading());
}

// открытие попапа добавления карточки
profileAddCardButton.addEventListener('click', openAddCardPopup);

function openAddCardPopup() {
  formValidators['add-card-form'].resetValidation();
  popupCard.openPopup();
}

//отпраление формы добавления карточки
function handleSubmitForm(cardData) {
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
function openImagePopup(link, name) {
  popupWithImage.openPopup(link, name);
}

// открытие попапа удаления карточки
function openDeleteCard(card, cardId) {
  popupDeleteCard.openPopup();
  popupDeleteCard.setNewSubmitHandler(() => {
    handleSubmitDelete(card, cardId);
  });
}

// удаление карточки
function handleSubmitDelete(card, cardId) {
  popupDeleteCard.renderLoading('Удаление...');
  api.deleteCard(cardId)
    .then((cardDelete) => {
      if (cardDelete) {
        card.remove();
        card = null;
      }
      popupDeleteCard.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupDeleteCard.renderLoading());
}

// лайк карточки
function cardLike(id, isLiked) {
  return api.likesCard(id, isLiked);
}