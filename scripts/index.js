import { initialCards } from "./initial-cards.js";
import { Card } from "./card.js";
import { FormValidator, validatorSetting } from "./card2.js";

// шаблон карточки
const cardTemplate = '.card-template';

// список карточек
const cardsList = document.querySelector('.cards__list');

// Popup
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

// кнопки popup
const popupClosedButtons = document.querySelectorAll('.popup__closed-btn');

// кнопки открытия
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddCardButton = document.querySelector('.profile__add-card-btn');

// Информация о пользователе на странице
const profileUserName = document.querySelector('.profile__user-name');
const profileText = document.querySelector('.profile__text');

// Форма заполнения профиля 
const popupFormEdit = document.querySelector('.popup__form_type_edit-profile');
const profileFormName = popupFormEdit.querySelector('.popup__input_data_name');
const profileFormJob = popupFormEdit.querySelector('.popup__input_data_job');

// Форма добавления карточки
const popupFormAdd = document.querySelector('.popup__form_type_add-card');
const formAddPlace = popupFormAdd.querySelector('.popup__input_data_place');
const formAddLink = popupFormAdd.querySelector('.popup__input_data_link');


function renderCard(cards) {
  cards.forEach((data) => {
    const card = new Card(data, cardTemplate);
    const cardElement = card.createCard();

    cardsList.prepend(cardElement);
  });
}

renderCard(initialCards);

function openPopup(elem) {
  elem.classList.add('popup_opened');
  elem.addEventListener('mousedown', closePopupOverlay);
  window.addEventListener('keydown', closePopupEsc);
  lockScroll();
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function closePopup(elem) {
  const currentPopup = elem.closest('.popup');

  currentPopup.removeEventListener('mousedown', closePopupOverlay);
  currentPopup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupEsc);
  unlockScroll();
}

function handleAddCard() {
  renderCard([{
    name: formAddPlace.value,
    link: formAddLink.value
  }]);
  closePopup(popupFormAdd);
  popupFormAdd.reset();
}

function openProfilePopup() {
  const formValidation = new FormValidator(validatorSetting, popupFormEdit);
  
  formValidation.enableValidation();
  fillFormEditProfile();
  openPopup(popupEditProfile);
}

function fillProfileData() {
  profileUserName.textContent = profileFormName.value;
  profileText.textContent = profileFormJob.value;
}

function fillFormEditProfile() {
  profileFormName.value = profileUserName.textContent;
  profileFormJob.value = profileText.textContent;
}

function submitFormProfile() {
  fillProfileData();
  closePopup(popupFormEdit);
}

function lockScroll() {
  const scrollBarSize = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarSize}px`;
}

function unlockScroll() {
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, 300);
}


//открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

// отпраление формы профайла
popupFormEdit.addEventListener('submit', submitFormProfile);

// открытие формы добавления карточки
profileAddCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//отпраление формы добавления карточки
popupFormAdd.addEventListener('submit', handleAddCard);

//закрытие всех popup
popupClosedButtons.forEach((elem) => {
  elem.addEventListener('click', () => closePopup(elem));
});


export { openPopup };