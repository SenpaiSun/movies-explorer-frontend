import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import { useEffect, useState } from 'react'
import { savedCard } from '../../utils/savedCard'
import moviesApiCards from '../../utils/MoviesApi'
import { apiBeatfilm } from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import Preloader from '../Preloader/Preloader'

function App() {
  const currentPath = window.location.pathname
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [getFilms, setGetFilms] = useState([])
  const [getFilmsShorts, setGetFilmsShorts] = useState([])
  const [searchFilms, setSearchFilms] = useState([])
  const [isSavedFilms, setIsSavedFilms] = useState([])
  const [isSavedFilmsShorts, setIsSavedFilmsShorts] = useState([])
  const [searchFilmsSaved, setSearchFilmsSaved] = useState([])
  const [isCheckedShorts, setIsCheckedShorts] = useState(localStorage.getItem('isCheckedShorts') === 'true')
  const [isCheckedShortsSaved, setIsCheckedShortsSaved] = useState(localStorage.getItem('isCheckedShortsSaved') === 'true')
  const [isLogged, setIsLogged] = useState(false)
  const [stateSubmit, setStateSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Переключение чекбокса короткометражек
  const handleToggle = () => {
    if(currentPath === '/movies') {
      setIsCheckedShorts(!isCheckedShorts)
      localStorage.setItem('isCheckedShorts', !isCheckedShorts)
    } else {
      setIsCheckedShortsSaved(!isCheckedShortsSaved)
      localStorage.setItem('isCheckedShortsSaved', !isCheckedShortsSaved)
    }
  }

  // Проверка токена пользователя
  const tokenCheck = () => {
    const token = localStorage.getItem('token')
    if (token) {
      apiBeatfilm.checkToken(token).then((res) => {
        setIsLogged(true)
        if (res) {
          setCurrentUser({ name: res.name, email: res.email, id: res._id })
        }
      })
      getSavedCard()
    moviesApiCards
      .getBaseCards()
      .then((res) => {
        setGetFilms(res)
        const filterCards = res.filter((card) => card.duration <= 40)
        setGetFilmsShorts(filterCards)
      })
      .catch(console.error)
    setIsLoading(false)
    }
  }

  // Удаление токена пользователя
  const tokenRemove = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/', { replace: true })
  }

  // Фиксация состояния чекбокса короткометражек
  useEffect(() => {
    if(currentPath === '/movies') {
      localStorage.setItem('isCheckedShorts', isCheckedShorts)
    } else {
      localStorage.setItem('isCheckedShortsSaved', isCheckedShortsSaved)
    }
  }, [isCheckedShorts, isCheckedShortsSaved])

  // Получение сохраненных фильмов
  const getSavedCard = () => {
    apiBeatfilm
      .getSavedCard()
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setIsSavedFilms(data)
        const filterCards = data.filter((card) => card.duration <= 40)
        setIsSavedFilmsShorts(filterCards)
      })
      .catch((err) => console.err)
  }

  // Получение при монтировании состояния токена, сохраненных фильмов, базовых фильмов
  useEffect(() => {
    setIsLoading(true)
    tokenCheck()
    console.log(isLogged)
  }, [])


  // Поиск карточек по имени
  const getCardsByName = (value) => {
    setStateSubmit(true)
    if(currentPath === '/movies') {
      setSearchFilms(
        (!isCheckedShorts ? getFilms : getFilmsShorts).filter((card) => {
          return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
        })
      )
    }
    if(currentPath === '/saved-movies') {
      setSearchFilmsSaved(
        (!isCheckedShortsSaved ? isSavedFilms : isSavedFilmsShorts).filter((card) => {
          return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
        })
      )
    }
  }

  // Поиск карточек по состоянию чекбокса короткометражек
  const getCardsByShorts = (value, state) => {
    console.log(searchFilms)
    setStateSubmit(true)
    if(currentPath === '/movies') {
      setSearchFilms(
        (state ? getFilms : getFilmsShorts).filter((card) => {
          return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
        })
      )
    }
    if(currentPath === '/saved-movies') {
      setSearchFilmsSaved(
        (state ? isSavedFilms : isSavedFilmsShorts).filter((card) => {
          return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
        })
      )
    }
  }

  // Регистрация
  const register = (data) => {
    apiBeatfilm
      .register(data)
      .then((res) => {
        navigate('/signin', { replace: true })
        return res
      })
      .catch((err) => console.err)
  }

  // Авторизация
  const login = (data) => {
    apiBeatfilm
      .login(data)
      .then((res) => {
        localStorage.setItem('token', `${res.token}`)
        setIsLogged(true)
        navigate('/movies', { replace: true })
      })
      .catch((err) => console.err)
  }

  // Добавление карточки в сохраненные
  const likeCard = (dataCard) => {
    apiBeatfilm
      .likeCard(dataCard)
      .then((res) => {
        getSavedCard()
        return res
      })
      .catch((err) => console.err)
  }

  const deleteCard = (id) => {
    console.log(id)
    apiBeatfilm
      .deleteCard(id)
      .then((res) => {
        const updateArrayCard = searchFilmsSaved.filter((card) => card.movieId !== id)
        setSearchFilmsSaved(updateArrayCard)
        return res
      })
      .catch((err) => console.err)
  }

  return (
    <CurrentUserContext.Provider value={{ isLogged, currentUser, isCheckedShorts, isCheckedShortsSaved, isLoading, searchFilmsSaved, isSavedFilms}}>
      <div className='root'>
        <Routes>
          <Route path='/' element={<Main main={true} landing={true} isLogged={isLogged} />} />

          {(isLogged && !isLoading) && (
            <>
              <Route
                path='/movies'
                element={
                  <ProtectedRoute
                    component={Movies}
                    main={true}
                    mainMovies={true}
                    films={searchFilms}
                    getCardsByName={getCardsByName}
                    getCardsByShorts={getCardsByShorts}
                    handleToggle={handleToggle}
                    isCheckedShorts={isCheckedShorts}
                    isLogged={isLogged}
                    stateSubmit={stateSubmit}
                    likeCard={likeCard}
                    handleDelete={deleteCard}
                  />
                }
              />

              <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} handleDelete={deleteCard} isLogged={isLogged} isSavedFilms={isSavedFilms} getCardsByName={getCardsByName} getCardsByShorts={getCardsByShorts} handleToggle={handleToggle} />} />

              <Route path='/profile' element={<ProtectedRoute component={Profile} isLogged={isLogged} userData={currentUser} tokenRemove={tokenRemove} />} />
            </>
          )}

          <Route path='/signup' element={<Register toRegisterApi={register} />} />

          <Route path='/signin' element={<Login toLoginApi={login} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
