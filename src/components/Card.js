export class Card {
  constructor({
    name,
    link,
    likes,
    _id,
    owner
  }, templateSelector, openImage, openCardDelete, cardLike, userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner._id;
    this._userId = userId;
    this.openImage = openImage;
    this._openCardDelete = openCardDelete;
    this._cardLike = cardLike;

    this._cardElement = document
      .querySelector(templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleBindCard() {
    // лайки карточек
    this._likeButton.addEventListener('click', this._handleCardLike.bind(this));

    // удаление карточки
    if (this._owner === this._userId) {
      this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
      this._deleteButton.classList.remove('card__delete-btn_hidden');
      this._deleteButton.addEventListener('click', this._handleOpenCardDelete.bind(this));
    }

    // popup картинок в карточке
    this._cardImage.addEventListener('click', this._handleOpenImagePopup.bind(this));
  }

  _handleCardLike() {
    this._cardLike(this._id, this._isLiked())
      .then(card => {
        this._cardLikesCounter.textContent = card.likes.length;
        this._likes = card.likes;

        this._setHeartLike();
      });
  }

  _isLiked() {
    return this._likes.find(like => like._id === this._userId);
  }

  _setHeartLike() {
    if (this._isLiked()) {
      this._likeButton.classList.add('card__like-btn_active');
    } else {
      this._likeButton.classList.remove('card__like-btn_active');
    }
  }

  _handleOpenCardDelete() {
    this._openCardDelete(this._cardElement, this._id);
  }

  _handleOpenImagePopup() {
    this.openImage(this._link, this._name);
  }

  createCard() {
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardText = this._cardElement.querySelector('.card__title');
    this._likeButton = this._cardElement.querySelector('.card__like-btn');
    this._cardLikesCounter = this._cardElement.querySelector('.card__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardText.textContent = this._name;
    this._cardLikesCounter.textContent = this._likes.length;

    this._setHeartLike();
    this._handleBindCard();

    return this._cardElement;
  }
}