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
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [getFilms, setGetFilms] = useState([])
  const [getFilmsShorts, setGetFilmsShorts] = useState([])
  const [searchFilms, setSearchFilms] = useState([])
  const [isCheckedShorts, setIsCheckedShorts] = useState(localStorage.getItem('isCheckedShorts') === 'true')
  const [isLogged, setIsLogged] = useState(false)
  const [stateSubmit, setStateSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = () => {
    setIsCheckedShorts(!isCheckedShorts)
    localStorage.setItem('isCheckedShorts', !isCheckedShorts)
  }

  console.log(isLogged)

  const tokenCheck = () => {
    const token = localStorage.getItem('token')
    if (token) {
      apiBeatfilm.checkToken(token).then((res) => {
        if (res) {
          setCurrentUser({ name: res.name, email: res.email })
          setIsLogged(true)
        }
      })
    }
  }

  const tokenRemove = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    localStorage.setItem('isCheckedShorts', isCheckedShorts)
  }, [isCheckedShorts])

  useEffect(() => {
    moviesApiCards
      .getBaseCards()
      .then((res) => {
        setGetFilms(res)
        const filterCards = res.filter((card) => card.duration <= 40)
        setGetFilmsShorts(filterCards)
      })
      .catch(console.error)
  }, [])

  const getCardsByName = (value) => {
    setStateSubmit(true)
    setIsLoading(true)
    setSearchFilms(
      (!isCheckedShorts ? getFilms : getFilmsShorts).filter((card) => {
        return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
      })
    )
  }

  const getCardsByShorts = (value, state) => {
    setStateSubmit(true)
    setIsLoading(true)
    setSearchFilms(
      (state ? getFilms : getFilmsShorts).filter((card) => {
        return card.nameRU.toLowerCase().includes(value.toLowerCase()) || card.nameEN.toLowerCase().includes(value.toLowerCase())
      })
    )
  }

  const [arrayCard, setArrayCard] = useState(savedCard)

  const handleDeleteCard = (cardId) => {
    const updateArrayCard = arrayCard.filter((card) => card._id !== cardId)
    setArrayCard(updateArrayCard)
  }

  const register = (data) => {
    apiBeatfilm
      .register(data)
      .then((res) => {
        navigate('/signin', { replace: true })
        return res
      })
      .catch((err) => console.err)
  }

  const login = (data) => {
    apiBeatfilm.login(data).then((res) => {
      localStorage.setItem('token', `${res.token}`)
      setIsLogged(true)
      navigate('/movies', { replace: true })
    })
  }

  const likeCard = (dataCard) => {
    apiBeatfilm.likeCard(dataCard).then((res) => {
      return res
    })
  }

  return (
    <CurrentUserContext.Provider value={{ isLogged, currentUser, isCheckedShorts, isLoading }}>
      <div className='root'>
        <Routes>
          <Route path='/' element={<Main main={true} landing={true} isLogged={isLogged} />} />

          <Route
            path='/movies'
            element={<ProtectedRouteElement component={Movies} main={true} mainMovies={true} films={searchFilms} getCardsByName={getCardsByName} getCardsByShorts={getCardsByShorts} handleToggle={handleToggle} isCheckedShorts={isCheckedShorts} isLogged={isLogged} stateSubmit={stateSubmit} />}
          />

          <Route path='/saved-movies' element={<ProtectedRouteElement component={SavedMovies} cardData={arrayCard} handleDelete={handleDeleteCard} isLogged={isLogged} />} />

          <Route path='/profile' element={<ProtectedRouteElement component={Profile} isLogged={isLogged} userData={currentUser} tokenRemove={tokenRemove} />} />

          <Route path='/signup' element={isLogged ? <Navigate to='/' replace /> : <Register toRegisterApi={register} />} />

          <Route path='/signin' element={isLogged ? <Navigate to='/' replace /> : <Login toLoginApi={login} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
