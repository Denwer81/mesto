import './index.css';

import {
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
  apiSettings,
  popupDelete,
  popupChangeAvatar,
  popupFormChangeAvatar,
  profileAvatar
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
const section = new Section({ items: [], renderer: renderCard }, cardsList);

// popup экземпляры
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
const popupAvatar = new PopupWithForm(popupChangeAvatar, submitAvatarForm);
const popupCard = new PopupWithForm(popupAddCard, handleSubmitForm);
const popupDeleteCard = new PopupWithForm(popupDelete);

// валидация карточек
const formProfileValidation = new FormValidator(validatorSetting, popupFormEdit);
const formAddCardValidation = new FormValidator(validatorSetting, popupFormAdd);
const formChangeAvatarValidation = new FormValidator(validatorSetting, popupFormChangeAvatar);

formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
formChangeAvatarValidation.enableValidation();

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

    cards.reverse().forEach(card => {
      renderCard(card);
    });
  })
  .catch(err => console.log(err));

// создание и рендер карточки
function createCard(dataCard) {
  const cardElement = new Card(dataCard, cardTemplate, openImagePopup, openDeleteCard, cardLike, userId);
  return cardElement;
}

function renderCard(dataCard) {
  const card = createCard(dataCard).createCard();
  section.addItem(card);
}

// открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();

  popupProfile.setInputValues(profileData);
  formProfileValidation.resetValidation();
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
profileAvatar.addEventListener('click', openChangeAvatarPopup);

function openChangeAvatarPopup() {
  formChangeAvatarValidation.resetValidation();
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
  formAddCardValidation.resetValidation();
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