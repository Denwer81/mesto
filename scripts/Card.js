import {
  popupImage,
  popupCardImage,
  popupImageText
} from './const.js';

import {
  openPopup,
} from './index.js';

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
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleBindCard() {
    // лайки карточек
    this._likeButton = this._cardElement.querySelector('.card__like-btn');
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });

    // удаление карточки
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });

    // popup картинок в карточке
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImageModal();
    });
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('card__like-btn_active');
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleOpenImageModal() {
    popupCardImage.src = '';
    popupCardImage.src = this._link;
    popupCardImage.alt = `Фото ${this._name}`;
    popupImageText.textContent = this._name;

    openPopup(popupImage);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardText = this._cardElement.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardText.textContent = this._name;

    this._handleBindCard();

    return this._cardElement;
  }
}

export {
  Card
};