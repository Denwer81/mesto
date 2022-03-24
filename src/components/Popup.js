export class Popup {
  constructor(currentPopup) {
    this._popup = currentPopup;
    this._closeButton = this._popup.querySelector('.popup__closed-btn');
    this._handleClosePopupButton = this._closePopupButton.bind(this);
    this._handleClosePopupOverlay = this._closePopupOverlay.bind(this);
    this._handleClosePopupEsc = this._closePopupEsc.bind(this);
    }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
    this._lockScroll();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
    this._unlockScroll();
  }

  _setEventListeners() {
    this._closeButton.addEventListener('click', this._handleClosePopupButton);
    this._popup.addEventListener('mousedown', this._handleClosePopupOverlay);
    document.addEventListener('keydown', this._handleClosePopupEsc);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this._handleClosePopupButton);
    this._popup.removeEventListener('mousedown', this._handleClosePopupOverlay);
    document.removeEventListener('keydown', this._handleClosePopupEsc);
  }

  _closePopupButton() {
    this.closePopup();
  }

  _closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  }
  
  _closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _lockScroll() {
    const scrollBarSize = window.innerWidth - document.documentElement.clientWidth;
  
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarSize}px`;
  }
  
  _unlockScroll() {
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }, 300);
  }
}