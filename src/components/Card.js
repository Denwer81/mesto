export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;

    this._cardElement = document
      .querySelector(templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleBindCard() {
    // лайки карточек
    this._likeButton = this._cardElement.querySelector('.card__like-btn');
    this._likeButton.addEventListener('click', this._handleCardLike.bind(this));

    // удаление карточки
    this._deleteButton = this._cardElement.querySelector('.card__delete-btn');
    this._deleteButton.addEventListener('click', this._handleDelete.bind(this));

    // popup картинок в карточке
    this._cardImage.addEventListener('click', this._handleOpenImagePopup.bind(this));
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('card__like-btn_active');
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleOpenImagePopup() {
    this._handleCardClick(this._link, this._name);
  }

  createCard() {
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardText = this._cardElement.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardText.textContent = this._name;

    this._handleBindCard();

    return this._cardElement;
  }
}