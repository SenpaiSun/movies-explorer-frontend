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
  const [isStateValidate, setIsStateValidate] = useState({
    component: '',
    code: '',
  })

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

  // Сохранение фильмов в localstorage
  useEffect(() => {
    const filmsJSON = JSON.stringify(searchFilms);
    const savedFilmsJSON = JSON.stringify(searchFilmsSaved);
    localStorage.setItem('films', filmsJSON);
    localStorage.setItem('savedFilms', savedFilmsJSON);
  }, [searchFilms, searchFilmsSaved])


  // Получение сохраненных фильмов
  const getSavedCard = () => {
    apiBeatfilm
      .getSavedCard()
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
      console.log(getFilms)
      console.log(getFilmsShorts)
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

  // Авторизация
  const login = (data) => {
    apiBeatfilm
      .login(data)
      .then((res) => {
        setIsStateValidate({
          component: 'login',
          code: 200
        })
        localStorage.setItem('token', `${res.token}`)
        setIsLogged(true)
        navigate('/movies', { replace: true })
        console.log(isStateValidate)
      })
      .catch((err) => {
        setIsStateValidate({
          component: 'login',
          code: err.status
        })
      })
  }

  // Регистрация
  const register = (data) => {
    apiBeatfilm
      .register(data)
      .then((res) => {
        setIsStateValidate({
          component: 'register',
          code: 200
        })
        login(data)
      })
      .catch((err) => {
        setIsStateValidate({
          component: 'register',
          code: err.status
        })
      })
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

  const updateProfile = (data) => {
    return apiBeatfilm.updateProfile(data)
    .then((res) => {
      setIsStateValidate({
        component: 'profile',
        code: 200
      })
      return res
    })
    .catch((err) => {
      setIsStateValidate({
        component: 'profile',
        code: err.status
      })
    })
  }

  return (
    <CurrentUserContext.Provider value={{ isLogged, currentUser, isCheckedShorts, isCheckedShortsSaved, isLoading, searchFilms, searchFilmsSaved, isSavedFilms, isStateValidate}}>
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

              <Route path='/profile' element={<ProtectedRoute component={Profile} isLogged={isLogged} userData={currentUser} tokenRemove={tokenRemove} updateProfile={updateProfile}/>} />
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
