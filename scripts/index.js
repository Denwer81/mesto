// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

// список карточек
const cardsList = document.querySelector('.cards__list');

// Popup
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

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

// Картинка с подписью в popup
const popupCardImage = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__image-text');


function openPopup(elem) {
  elem.classList.add('popup_opened');
  elem.addEventListener('mousedown', closePopupOverlay);
  window.addEventListener('keydown', closePopupEsc);
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
}

function addCard(elem) {
  const card = createCard(elem);

  cardsList.prepend(card);
}

function createCard(elem) {
  const card = cardTemplate.cloneNode(true);
  const cardTemplateTitle = card.querySelector('.card__title');
  const cardTemplateImage = card.querySelector('.card__image');

  cardTemplateTitle.textContent = elem.name;
  cardTemplateImage.src = elem.link;
  cardTemplateImage.alt = `Фото ${elem.name}`;
  handleBindCard(card);

  return card;
}

function handleBindCard(card) {
  // лайки карточек
  const cardLikeButton = card.querySelector('.card__like-btn');
  cardLikeButton.addEventListener('click', handleCardLike);

  // popup картинок в карточке
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', handleOpenImageModal);

  // удаление карточки
  const cardDeleteButton = card.querySelector('.card__delete-btn');
  cardDeleteButton.addEventListener('click', handleDelete);
}

function handleCardLike(evt) {
  evt.target.classList.toggle('card__like-btn_active')
}

function handleOpenImageModal(evt) {
  popupCardImage.src = '';
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupImageText.textContent = evt.target.alt.slice(4);
  openPopup(popupImage);
}

function handleDelete(evt) {
  evt.target.closest('.card').remove();
}

function handleAddCard() {
  addCard({
    name: formAddPlace.value,
    link: formAddLink.value
  });
  closePopup(popupFormAdd);
  popupFormAdd.reset();
}

function openProfilePopup() {
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


// Инициализация карточек
initialCards.forEach((elem) => addCard(elem));

// открытие профайла
profileEditButton.addEventListener('click', openProfilePopup);

// отпраление формы профайла
popupFormEdit.addEventListener('submit', submitFormProfile);

// открытие формы добавления карточки
profileAddCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// отпраление формы добавления карточки
popupFormAdd.addEventListener('submit', handleAddCard);

// закрытие всех popup
popupClosedButtons.forEach((elem) => { 
  elem.addEventListener('click', () => closePopup(elem)) 
});