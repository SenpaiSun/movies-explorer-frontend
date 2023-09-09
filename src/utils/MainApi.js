export class MainApi {
  constructor(data) {
    this._url = data.url
    this._headers = data.headers
  }

  _checkedError(res) {
    if (res.ok) {
      return res.json()
    }
    return res.json().then(errorData => {
      const error = new Error(errorData.message);
      error.status = res.status;
      return Promise.reject(error);
    });
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    }).then((res) => this._checkedError(res))
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then((res) => this._checkedError(res))
  };

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._checkedError(res))
  }

  likeCard(dataCard) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard)
    })
    .then((res) => this._checkedError(res))
  }

  getSavedCard() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._checkedError(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._checkedError(res))
}

  updateProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then((res) => this._checkedError(res))
  };
}



export const apiBeatfilm = new MainApi({
  url: 'https://api.drow-films.nomoreparties.co',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})
