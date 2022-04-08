export class Card {
  constructor({ dataCard, cardTemplateSelector, handleOpenImagePopup, handleOpenDeletePopup, handleCardLike, userId }) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this.id = dataCard._id;
    this._owner = dataCard.owner._id;
    this._userId = userId;
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._handleOpenDeletePopup = handleOpenDeletePopup;
    this._handleCardLike = handleCardLike;

    this._cardElement = document
      .querySelector(cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleBindCard() {
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup(this._link, this._name);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this.id, this._isLiked());
    });

    if (this._owner === this._userId) {
      this._setDeleteButton();

      this._deleteButton.addEventListener('click', () => {
        this._handleOpenDeletePopup(this);
      });
    }
  }

  _setDeleteButton() {
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
    this._deleteButton.classList.remove('card__delete-btn_hidden');
  }

  setHeartLike() {
    if (this._isLiked()) {
      this._likeButton.classList.add('card__like-btn_active');
    } else {
      this._likeButton.classList.remove('card__like-btn_active');
    }
  }

  setLikesCount(card) {
    if (card) {
      this._likes = card.likes;
    }
    this._cardLikesCounter.textContent = this._likes.length;
  }

  _isLiked() {
    return this._likes.find(like => like._id === this._userId);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  createCard() {
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardText = this._cardElement.querySelector('.card__title');
    this._likeButton = this._cardElement.querySelector('.card__like-btn');
    this._cardLikesCounter = this._cardElement.querySelector('.card__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardText.textContent = this._name;
    
    this.setHeartLike();
    this.setLikesCount();
    this._handleBindCard();

    return this._cardElement;
  }
}