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
      .cloneNode(true);

    return cardElement;
  }

  _handleBindCard() {
    // лайки карточек
    this._buttonLike = this._cardElement.querySelector('.card__like-btn');
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    // удаление карточки
    this._cardElement.querySelector('.card__delete-btn').
    addEventListener('click', () => {
      this._handleDelete();
    });

    // popup картинок в карточке
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImageModal();
    });
  }

  _handleCardLike() {
    this._buttonLike.classList.toggle('card__like-btn_active');
  }

  _handleDelete() {
    console.log(this._cardElement);
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleOpenImageModal() {
    popupCardImage.src = '';
    popupCardImage.src = this._cardImage.src;
    popupCardImage.alt = this._cardImage.alt;
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