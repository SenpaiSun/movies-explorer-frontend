import './Header.css'
import React, { useContext, useEffect, useState } from 'react'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import HamburgerMenu from '../HamburgerMenu/HamurgerMenu'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function Header(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const currentUser = useContext(CurrentUserContext)
  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [isHamburgerMenu, setHamburgerMenu] = React.useState(false)
  useEffect(() => {
    if (windowSize > 768) {
      setHamburgerMenu(false)
    }
  }, [windowSize])

  function handleClickMenu() {
    setHamburgerMenu(!isHamburgerMenu)
  }

  return (
    <header className={props.landing ? 'header' : 'header header-main header-active'}>
      <nav className='header__container-logo'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='Логотип сервиса drow-films' />
        </Link>
      </nav>
      {props.main && windowSize > 768 && currentUser.isLogged && <Navigation landing={props.landing} mainMovies={props.mainMovies} mainSaved={props.mainSaved} profile={props.profile} />}
      {!currentUser.isLogged && (
        <nav className='header__container'>
          <Link to='/signup' className='header__link-register'>
            Регистрация
          </Link>
          <nav className='header__container-link'>
            <Link to='/signin' className='header__link-signin'>
              Войти
            </Link>
          </nav>
        </nav>
      )}
      {windowSize <= 768 && props.main && <HamburgerMenu onClick={handleClickMenu} />}
    </header>
  )
}
