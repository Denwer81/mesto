import { openPopup } from './index.js';

class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .cloneNode(true);

    return cardElement;
  }

  _handleBindCard() {
    // лайки карточек
    const cardLikeButton = this._cardElement.querySelector('.card__like-btn');
    cardLikeButton.addEventListener('click', this._handleCardLike);

    // удаление карточки
    const cardDeleteButton = this._cardElement.querySelector('.card__delete-btn');
    cardDeleteButton.addEventListener('click', this._handleDelete);

    // popup картинок в карточке
    const cardImage = this._cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', this._handleOpenImageModal);
  }

  _handleCardLike(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  _handleDelete(evt) {
    evt.target.closest('.card').remove();
  }

  _handleOpenImageModal(evt) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupCardImage = popupImage.querySelector('.popup__image');
    const popupImageText = popupImage.querySelector('.popup__image-text');

    popupCardImage.src = '';
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupImageText.textContent = evt.target.alt.slice(4);

    openPopup(popupImage);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = `Фото ${this._name}`;

    this._handleBindCard();

    return this._cardElement;
  }
}

export { Card };