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
  profileFormName,
  profileFormJob,
  apiSettings,
  popupDelete,
  popupChangeAvatar,
  popupFormChangeAvatar,
  profileAvatar
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

import {
  Api
} from '../components/Api';


// api экземпляр
const api = new Api(apiSettings);

// инициализация профиля
let userId = '';

api.getProfile()
  .then(res => {
    userId = res._id;
    userInfo.setUserInfo({
      userName: res.name,
      userAbout: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  });

// рендер карточки
function renderCard(dataCard) {
  const cardElement = new Card(dataCard, cardTemplate, openImagePopup, openDeleteCard, cardLike, userId);
  const card = cardElement.createCard();

  section.addItem(card);
}

// инициализация карточек
const section = new Section({
  items: [],
  renderer: renderCard
}, cardsList);

api.getInitialCards()
  .then(cards => {
    cards.reverse().forEach(card => {
      renderCard(card);
    });
  });

// popup экземпляры
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
const popupAvatar = new PopupWithForm(popupChangeAvatar, submitAvatarForm);
const popupCard = new PopupWithForm(popupAddCard, handleSubmitForm);
const popupDeleteCard = new PopupWithForm(popupDelete);

// данные пользователя
const userInfo = new UserInfo(userDataSelector);

// валидация карточек
const formProfileValidation = new FormValidator(validatorSetting, popupFormEdit);
const formAddCardValidation = new FormValidator(validatorSetting, popupFormAdd);
const formChangeAvatarValidation = new FormValidator(validatorSetting, popupFormChangeAvatar);

formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
formChangeAvatarValidation.enableValidation();

// открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();

  profileFormName.value = profileData.userName;
  profileFormJob.value = profileData.userAbout;

  formProfileValidation.resetValidation();
  popupProfile.openPopup();
}

// отпраление формы профайла
function submitProfileForm(userData, submitButton) {
  submitButton.textContent = 'Сохранение...';

  api.editProfile(userData.name, userData.job)
    .then(res => {
      userInfo.setUserInfo({
        userName: res.name,
        userAbout: res.about,
      });
    })
    .then(() => {
      submitButton.textContent = 'Сохранить';

      popupProfile.closePopup();
    });
}

// открытие смены аватара
profileAvatar.addEventListener('click', openChangeAvatarPopup);

function openChangeAvatarPopup() {
  formChangeAvatarValidation.resetValidation();

  popupAvatar.openPopup();
}

// отправление формы смена аватара
function submitAvatarForm(link, submitButton) {
  submitButton.textContent = 'Сохранение...';

  api.changeAvatar(link['avatar-image-url'])
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
    })
    .then(() => {
      submitButton.textContent = 'Сохранить';

      popupAvatar.closePopup();
    });
}

// открытие попапа добавления карточки
profileAddCardButton.addEventListener('click', openAddCardPopup);

function openAddCardPopup() {
  formAddCardValidation.resetValidation();
  popupCard.openPopup();
}

//отпраление формы добавления карточки
function handleSubmitForm(cardData, submitButton) {
  submitButton.textContent = 'Сохранение...';

  api.addNewCard(cardData['data-image'], cardData['data-image-url'])
    .then(card => {
      renderCard(card);
    })
    .then(() => {
      submitButton.textContent = 'Создание';

      popupCard.closePopup();
    });
}

// открытие попапа картинки
function openImagePopup(link, name) {
  popupWithImage.openPopup(link, name);
}

// открытие попапа удаления карточки
function openDeleteCard(card, cardId) {
  popupDeleteCard.openPopup();
  popupDeleteCard.setNewSubmitHandler((data, submitButton) => {
    handleSubmitDelete(card, cardId, submitButton);
  });
}

// удаление карточки
function handleSubmitDelete(card, cardId, submitButton) {
  submitButton.textContent = 'Удаление...';

  api.deleteCard(cardId)
    .then((cardDelete) => {
      if (cardDelete) {
        card.remove();
        card = null;


        popupDeleteCard.closePopup();
      }
      popupDeleteCard.closePopup();
    })
    .finally(() => submitButton.textContent = 'Да');
}

// лайк карточки
function cardLike(id, isLiked) {
  return api.likesCard(id, isLiked);
}