const profileEditButton = document.querySelector('.profile__edit-btn');
let profileUserName = document.querySelector('.profile__user-name');
let profileText = document.querySelector('.profile__text');
const popup = document.querySelector('.popup');
const popupClosedButton = popup.querySelector('.popup__closed-btn');
const popupSavedButton = popup.querySelector('.popup__saved-btn');
const popupForm = popup.querySelector('.popup__form');
const profileFormInfo = popup.querySelectorAll('.popup__input');
let cardLikeButton = document.querySelectorAll('.card__like-btn');


function openPopup() {
  popup.classList.add('popup_opened')
};

function closePopup() {
  popup.classList.remove('popup_opened')
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileFormInfo.forEach(function (elem) {
    if (elem.name === 'name') {
      profileUserName.textContent = elem.value;
    }
    if (elem.name === 'job') {
      profileText.textContent = elem.value;
    }
  })
  closePopup();
};

profileEditButton.addEventListener('click', function () {
  openPopup();
  profileFormInfo.forEach(function (elem) {
    if (elem.name === 'name') {
      elem.value = profileUserName.textContent;
    }
    if (elem.name === 'job') {
      elem.value = profileText.textContent;
    }
  })
});

popupClosedButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler);

popup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
});

window.onkeydown = function(event) {
  if (event.keyCode === 27) {
    closePopup()
  }
};

cardLikeButton.forEach(function (elem) {
  elem.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active')
  })
});