export class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this.headers
      })
      .then(res => this._checkResponse(res));
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this.headers
      })
      .then(res => this._checkResponse(res));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this._checkResponse(res));
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => this._checkResponse(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => this._checkResponse(res));
  }

  likesCard(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this.headers
        })
        .then(res => this._checkResponse(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this.headers
        })
        .then(res => this._checkResponse(res));
    }
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}