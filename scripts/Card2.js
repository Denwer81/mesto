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
    this._buttonLike = this._cardElement.querySelector('.card__like-btn');
    this._buttonLike.addEventListener('click', this._handleCardLike);

    // удаление карточки
    this._cardElement.
      querySelector('.card__delete-btn').
      addEventListener('click', this._handleDelete);

    // popup картинок в карточке
    this._cardElement.
      querySelector('.card__image').
      addEventListener('click', this._handleOpenImageModal);
  }

  _handleCardLike() {
    this._buttonLike.toggle('card__like-btn_active');
  }

  _handleDelete(evt) {
    this._cardElement.remove();
    this._cardElement = null;
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