import './Header.css'
import React from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'

export default function Header(props) {
  return (
    <header className={props.landing ? 'header' : 'header header-main'}>
      <div className='header__container-logo'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип сервиса drow-films' />
      </Link>
      </div>
      {props.main && <Navigation mainMovies={props.mainMovies} mainSaved={props.mainSaved} profile={props.profile}/>}
      {props.landing && (
        <div className='header__container'>
          <Link to='/signup' className='header__link-register'>
            Регистрация
          </Link>
          <div className='header__container-link'>
            <Link to='/signin' className='header__link-signin'>
              Войти
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
