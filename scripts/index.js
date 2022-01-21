// Popup
const popup = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

// кнопки popup
const popupClosedButton = document.querySelectorAll('.popup__closed-btn');
const popupSavedButton = document.querySelectorAll('.popup__saved-btn');

// кнопки открытия
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddAcardButton = document.querySelector('.profile__add-card-btn');

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

// лайки карточек
const cardLikeButton = document.querySelectorAll('.card__like-btn');

// список карточек
const cardsList = document.querySelector('.cards__list');

// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;
const cardTemplateImage = cardTemplate.querySelector('.card__image');
const cardTemplateTitle = cardTemplate.querySelector('.card__title');

// карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function togglePopup(elem) {
  let currentPopup = elem.closest('.popup');
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

function AddCards(elem) {
  cardTemplateTitle.textContent = elem.name;
  cardTemplateImage.alt = `Фото ${elem.name}`;
  cardTemplateImage.src = elem.link;
  
  const card = cardTemplate.cloneNode(true);
  cardsList.prepend(card);
}

function addCardHandler(evt) {
  evt.preventDefault();
  AddCards({
    name: formAddPlace.value,
    link: formAddLink.value
  });
  togglePopup(popupFormAdd);
}

function cardLikesHandler(evt) {
  evt.target.classList.toggle('card__like-btn_active')
};


initialCards.forEach((elem) => AddCards(elem));

profileEditButton.addEventListener('click', openProfileHandler);

profileAddAcardButton.addEventListener('click', () => togglePopup(popupAddCard));

popupFormEdit.addEventListener('submit', popupEditSubmit);

popupClosedButton.forEach(elem => elem.addEventListener('click', () => togglePopup(elem)));

cardLikeButton.forEach(elem => elem.addEventListener('click', cardLikesHandler))

popupFormAdd.addEventListener('submit', addCardHandler);






// // Popup
// const popup = document.querySelectorAll('.popup');
// const popupEditProfile = document.querySelector('.popup_edit-profile');
// const popupAddCard = document.querySelector('.popup_add-card');

// // кнопки popup
// const popupClosedButton = document.querySelectorAll('.popup__closed-btn');
// const popupSavedButton = document.querySelectorAll('.popup__saved-btn');

// // секция profile
//   // кнопки открытия
// const profileEditButton = document.querySelector('.profile__edit-btn');
// const profileAddAcardButton = document.querySelector('.profile__add-card-btn');
//   // Информация о пользователе на странице
// const profileUserName = document.querySelector('.profile__user-name');
// const profileText = document.querySelector('.profile__text');
//   // Форма заполнения данных 
// const popupForm = document.querySelectorAll('.popup__form');
// const profileFormName = popupEditProfile.querySelector('.popup__input_data_name');
// const profileFormJob = popupEditProfile.querySelector('.popup__input_data_job');

// // Карточки
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];


// function togglePopup(elem) {
//   let currentPopup = elem.closest('.popup');
//   currentPopup.classList.toggle('popup_opened');
// };

// function fillProfileData(elem) {
//   if (elem.classList.contains('popup__form_edit-profile')) {
//   profileUserName.textContent = profileFormName.value;
//   profileText.textContent = profileFormJob.value;
//   };
// };

// function fillFormData() {
//   profileFormName.value = profileUserName.textContent;
//   profileFormJob.value = profileText.textContent;
// };

// profileEditButton.addEventListener('click', () => {
//   fillFormData();
//   togglePopup(popupEditProfile);
// });

// popupForm.forEach(elem => elem.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   fillProfileData(elem);
//   togglePopup(elem);
// }));

// profileAddAcardButton.addEventListener('click', () => togglePopup(popupAddCard));

// popupClosedButton.forEach(elem => elem.addEventListener('click', () => togglePopup(elem)));