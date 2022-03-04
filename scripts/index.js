import {
  Card
} from "./Card.js";

import {
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
  formProfileValidation,
  formAddCardValidation
} from "./const.js";


function createCard(data) {
  const cardElement = new Card(data, cardTemplate);
  const card = cardElement.createCard();

  return card;
}

function renderCard(data) {
  const card = createCard(data);
  
  cardsList.prepend(card);
}

function openPopup(elem) {
  elem.classList.add('popup_opened');
  elem.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
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
  renderCard({
    name: formAddPlace.value,
    link: formAddLink.value
  });
  closePopup(popupFormAdd);
  popupFormAdd.reset();
}

function openProfilePopup() {
  formProfileValidation.toggleButtonState();
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

function openAddCardPopup() {
  formAddCardValidation.toggleButtonState();
  openPopup(popupAddCard);
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

// инициализация карточек
initialCards.forEach(data => renderCard(data));

//открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

// отпраление формы профайла
popupFormEdit.addEventListener('submit', submitFormProfile);

// открытие формы добавления карточки
profileAddCardButton.addEventListener('click', openAddCardPopup);

//отпраление формы добавления карточки
popupFormAdd.addEventListener('submit', handleAddCard);

//закрытие всех popup
popupClosedButtons.forEach((elem) => {
  elem.addEventListener('click', () => closePopup(elem));
});

// валидация карточек
formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();


export {
  openPopup
};