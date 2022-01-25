// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

// список карточек
const cardsList = document.querySelector('.cards__list');

// данные карточек
const initialCards = [
    {
    name: 'Национальный парк Секвойя',
    link: '../images/sequoia_park.jpg'
  },
  {
    name: 'Озеро сукко',
    link: '../images/sukko_lake.jpg'
  },
  {
    name: 'Парк Йосемити',
    link: '../images/yosemite_park.jpg'
  },
  {
    name: 'Big Sur',
    link: '../images/big_sur.jpg'
  },
  {
    name: 'Дубай',
    link: '../images/dubai.jpg'
  },
  {
    name: 'Будапешт',
    link: '../images/Budapest.jpg'
  },
];


// Инициализация карточек
initialCards.forEach((elem) => AddCards(elem));


// Popup
const popup = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

// кнопки popup
const popupClosedButton = document.querySelectorAll('.popup__closed-btn');
const popupSavedButton = document.querySelectorAll('.popup__saved-btn');

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


function AddCards(elem) {
  const card = cardTemplate.cloneNode(true);
  const cardTemplateTitle = card.querySelector('.card__title');
  const cardTemplateImage = card.querySelector('.card__image');
  cardTemplateTitle.textContent = elem.name;
  cardTemplateImage.src = elem.link;
  cardTemplateImage.alt = `Фото ${elem.name}`;
  
  cardsList.prepend(card);

  // лайки карточек
  const cardLikeButton = document.querySelector('.card__like-btn');
  cardLikeButton.addEventListener('click', cardLikesHandler);

  // popup картинок в карточке
  const cardImage = document.querySelector('.card__image');
  cardImage.addEventListener('click', openImageHandler);

  // удаление карточки
  const cardDeleteButton = document.querySelector('.card__delete-btn');
  cardDeleteButton.addEventListener('click', deleteHandler);
};

function addCardHandler(evt) {
  evt.preventDefault();
  AddCards({
    name: formAddPlace.value,
    link: formAddLink.value
  });
  togglePopup(popupFormAdd);
};

function cardLikesHandler(evt) {
  evt.target.classList.toggle('card__like-btn_active')
};

function openImageHandler(evt) {
  popupCardImage.src = '';
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupImageText.textContent = evt.target.alt.slice(4);
  togglePopup(popupImage);
};

function deleteHandler(evt) {
  evt.target.closest('.card').remove()
};

function togglePopup(elem) {
  const currentPopup = elem.closest('.popup');
  currentPopup.classList.toggle('popup_opened');
};

function fillProfileData() {
  profileUserName.textContent = profileFormName.value;
  profileText.textContent = profileFormJob.value;
};

function fillFormData() {
  profileFormName.value = profileUserName.textContent;
  profileFormJob.value = profileText.textContent;
};

function openProfileHandler() {
  fillFormData();
  togglePopup(popupEditProfile);
};

function popupEditSubmit(evt) {
  evt.preventDefault();
  fillProfileData();
  togglePopup(popupFormEdit);
};

// открытие профайла
profileEditButton.addEventListener('click', openProfileHandler);

// отпраление формы профайла
popupFormEdit.addEventListener('submit', popupEditSubmit);

// открытие формы добавления карточки
profileAddCardButton.addEventListener('click', () => togglePopup(popupAddCard));

// отпраление формы добавления карточки
popupFormAdd.addEventListener('submit', addCardHandler);

// закрытие всех popup
popupClosedButton.forEach((elem) => elem.addEventListener('click', () => togglePopup(elem)));
  