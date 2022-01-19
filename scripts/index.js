// Popup
const popup = document.querySelector('.popup');
// кнопки popup
const popupClosedButton = popup.querySelector('.popup__closed-btn');
const popupSavedButton = popup.querySelector('.popup__saved-btn');
// секция profile
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileUserName = document.querySelector('.profile__user-name');
const profileText = document.querySelector('.profile__text');
const profilePopupForm = popup.querySelector('.popup__form');
const profileFormName = popup.querySelector('.popup__input_data_name');
const profileFormJob = popup.querySelector('.popup__input_data_job');


function openPopup() {
  popup.classList.add('popup_opened')
};

function closePopup() {
  popup.classList.remove('popup_opened')
};

function fillProfileData() {
  profileUserName.textContent = profileFormName.value;
  profileText.textContent = profileFormJob.value;
};

function fillFormData() {
  profileFormName.value = profileUserName.textContent;
  profileFormJob.value = profileText.textContent;
}

profileEditButton.addEventListener('click', () => {
  fillFormData();
  openPopup();
});

profilePopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fillProfileData();
  closePopup();
});

popupClosedButton.addEventListener('click', closePopup);