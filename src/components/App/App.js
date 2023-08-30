import { Route, Routes, useNavigate } from 'react-router-dom'
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

function App() {
  const navigate = useNavigate();
  const [getCards, setGetCards] = useState([])
  const [saveBaseCards, setSaveBaseCards] = useState([])
  const [isCheckedShorts, setIsCheckedShorts] = useState(localStorage.getItem('isCheckedShorts') === 'true')
  const [isLogged, setIsLogged] = useState('false')
  console.log(isLogged)

  const handleToggle = () => {
    setIsCheckedShorts(!isCheckedShorts)
    localStorage.setItem('isCheckedShorts', !isCheckedShorts)
  }

  useEffect(() => {
    localStorage.setItem('isCheckedShorts', isCheckedShorts)
  }, [isCheckedShorts])

  useEffect(() => {
    if (isCheckedShorts) {
      moviesApiCards
        .getBaseCards()
        .then((res) => {
          setGetCards(res)
          setSaveBaseCards(res)
        })
        .catch(console.error)
    } else {
      moviesApiCards
        .getBaseCards()
        .then((res) => {
          const filterCards = res.filter((card) => card.duration > 50)
          setGetCards(filterCards)
          setSaveBaseCards(filterCards)
        })
        .catch(console.error)
    }
  }, [isCheckedShorts])

  const getCardsByName = (value) => {
    setGetCards(
      saveBaseCards.filter((card) => {
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
    apiBeatfilm.register(data)
    .then((res) => {
        navigate('/signin', {replace: true})
        return res
    })
    .catch(err => console.err)
  }

  const login = (data) => {
    apiBeatfilm.login(data).then((res) => {
      localStorage.setItem('token', `${res.token}`)
      setIsLogged(true)
    })
  }

  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={<Main landing={true} isLogged={isLogged} />} />

        <Route path='/movies' element={<ProtectedRouteElement component={Movies} main={true} mainMovies={true} getCards={getCards} getCardsByName={getCardsByName} handleToggle={handleToggle} isCheckedShorts={isCheckedShorts} isLogged ={isLogged}/>} />

        <Route path='/saved-movies' element={<ProtectedRouteElement component={SavedMovies} cardData={arrayCard} handleDelete={handleDeleteCard} main={true} mainSaved={true} isLogged ={isLogged}/>} />

        <Route path='/profile' element={<ProtectedRouteElement component={Profile} main={true} profile={true} isLogged ={isLogged}/>} />

        <Route path='/signup' element={<Register toRegister={true} title='Добро пожаловать!' buttonText='Зарегистрироваться' textRedirect='Уже зарегистрированы?' textLink='Войти' toRegisterApi={register} />} />

        <Route path='/signin' element={<Login title='Рады видеть!' buttonText='Войти' textRedirect='Ещё не зарегистрированы?' textLink='Регистрация' toLoginApi={login} />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
