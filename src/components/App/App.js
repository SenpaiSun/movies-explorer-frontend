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
import moviesApiCards from '../../utils/MoviesApi'
import { apiBeatfilm } from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

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
    console.log(`${token} fuck 1`)
    if (token) {
      apiBeatfilm.checkToken(token).then((res) => {
        getSavedCard()
        setIsLogged(true)
        if (res) {
          setCurrentUser({ name: res.name, email: res.email, id: res._id })
        }
      })
    moviesApiCards
      .getBaseCards()
      .then((res) => {
        setGetFilms(res)
        const filterCards = res.filter((card) => card.duration <= 40)
        setGetFilmsShorts(filterCards)
      })
      .catch(console.error)
    setIsLoading(false)
    } else {
      console.log(`${token} fuck 2`)
    }
  }

  // Удаление токена пользователя
  const tokenRemove = () => {
    localStorage.clear()
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
      .then((data) => {
        console.log(data)
        setIsSavedFilms(data)
        const filterCards = data.filter((card) => card.duration <= 40)
        setIsSavedFilmsShorts(filterCards)
        console.log(isSavedFilms)
      })
      .catch((err) => console.err)
  }

  // Получение при монтировании состояния токена, сохраненных фильмов, базовых фильмов
  useEffect(() => {
    tokenCheck()
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
        window.location.reload()
        tokenCheck();
      })
      .catch((err) => {
        setIsStateValidate({
          component: 'login',
          code: err.status
        })
      })
      .finally((res) => {
        console.log(localStorage.getItem('token'))
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
      })
      .then((res) => {
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
    apiBeatfilm
      .deleteCard(id)
      .then((res) => {
        const updateArrayCard = searchFilmsSaved.filter((card) => card.movieId !== id)
        console.log(updateArrayCard)
        setSearchFilmsSaved(updateArrayCard)
        getSavedCard()
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

          <Route path='/signup' element={!isLogged ? (<Register toRegisterApi={register}/>) : (<Navigate to='/' replace={true}/>)} />

          <Route path='/signin' element={!isLogged ? (<Login toLoginApi={login} />) : (<Navigate to='/' replace={true}/>)} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
