// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

// список карточек
const cardsList = document.querySelector('.cards__list');

// данные карточек
const initialCards = [
    {
    name: 'Национальный парк Секвойя',
    link: './images/sequoia_park.jpg'
  },
  {
    name: 'Озеро сукко',
    link: './images/sukko_lake.jpg'
  },
  {
    name: 'Парк Йосемити',
    link: './images/yosemite_park.jpg'
  },
  {
    name: 'Big Sur',
    link: './images/big_sur.jpg'
  },
  {
    name: 'Дубай',
    link: './images/dubai.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/Budapest.jpg'
  },
];

// Popup
const popupList = document.querySelectorAll('.popup');
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

  bindCardHandlers(card);
  return card;
}

function bindCardHandlers(card) {
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

function addCardHandler(evt) {
  evt.preventDefault();
  addCard({
    name: formAddPlace.value,
    link: formAddLink.value
  });
  togglePopup(popupFormAdd);
}

function handleCardLike(evt) {
  evt.target.classList.toggle('card__like-btn_active')
}

function handleOpenImageModal(evt) {
  popupCardImage.src = '';
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupImageText.textContent = evt.target.alt.slice(4);
  togglePopup(popupImage);
}

function handleDelete(evt) {
  evt.target.closest('.card').remove();
}

function togglePopup(elem) {
  const currentPopup = elem.closest('.popup');
  currentPopup.classList.toggle('popup_opened');
}

function fillProfileData() {
  profileUserName.textContent = profileFormName.value;
  profileText.textContent = profileFormJob.value;
}

function fillFormEditProfile() {
  profileFormName.value = profileUserName.textContent;
  profileFormJob.value = profileText.textContent;
}

function openProfileHandler() {
  fillFormEditProfile();
  togglePopup(popupEditProfile);
}

function submitFormProfile(evt) {
  evt.preventDefault();
  fillProfileData();
  togglePopup(popupFormEdit);
}

function openAddCardHandler() {
  popupFormAdd.reset();
  togglePopup(popupAddCard);
}

function closePopupEsc(evt) {
  currentPopup = document.querySelectorAll('.popup_opened');
  if (!!currentPopup.length && evt.key === 'Escape') {
    togglePopup(currentPopup[0]);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup(evt.target);
  }
}


// Инициализация карточек
initialCards.forEach((elem) => addCard(elem));

// открытие профайла
profileEditButton.addEventListener('click', openProfileHandler);

// отпраление формы профайла
popupFormEdit.addEventListener('submit', submitFormProfile);

// открытие формы добавления карточки
profileAddCardButton.addEventListener('click', openAddCardHandler);

// отпраление формы добавления карточки
popupFormAdd.addEventListener('submit', addCardHandler);

// закрытие всех popup
popupClosedButtons.forEach((elem) => elem.addEventListener('click', () => {
  togglePopup(elem)
}));

// закрытие popup по Esc
window.addEventListener('keydown', (evt) => closePopupEsc(evt));

// закрытие popup по ovelay
popupList.forEach((elem) => elem.addEventListener('mousedown', (evt) => {
  closePopupOverlay(evt)
}));