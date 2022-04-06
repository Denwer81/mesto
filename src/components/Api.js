export class Api {
  constructor({
    baseUrl,
    authorization
  }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(res => console.log(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
  }

  likesCard(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(res => console.log(res));
    }
  }
}