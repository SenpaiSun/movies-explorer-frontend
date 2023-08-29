export class MoviesApi {
  constructor(data) {
    this._url = data.url
  }

  _checkedError(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
  }

  getBaseCards() {
    return fetch(this._url, {
      method: 'GET'
    })
    .then(res => this._checkedError(res))
  }
}

const moviesApiCards = new MoviesApi({url: 'https://api.nomoreparties.co/beatfilm-movies'})

export default moviesApiCards