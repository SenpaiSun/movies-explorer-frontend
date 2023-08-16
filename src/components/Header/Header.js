import './Header.css'
import React from 'react'
import logo from '../../images/logo.png'
import accountLogo from '../../images/account.svg'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header className={props.landing ? 'header' : 'header header-main'}>
      <div className='header__container-logo'>
        <img className='header__logo' src={logo} alt='Логотип сервиса drow-films' />
        {props.main && (
          <div className='header__container-route'>
            <Link className='header__link-header' to=''>
              Фильмы
            </Link>
            <Link className='header__link-header header__link-header-saved' to=''>
              Сохранённые фильмы
            </Link>
          </div>
        )}
      </div>
      {props.main && (
        <div className='header__container-account'>
          <Link className='header__link-header' to=''>
            Аккаунт
          </Link>
          <div className='header__container-account-logo'>
            <img className='header__account-logo' src={accountLogo} alt='Иконка аккаунта'/>
          </div>
        </div>
      )}
      {props.landing && (
        <div className='header__container'>
          <Link to='/' className='header__link-register'>
            Регистрация
          </Link>
          <div className='header__container-link'>
            <Link to='/' className='header__link-signin'>
              Войти
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
