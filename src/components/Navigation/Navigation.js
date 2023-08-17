import React from 'react'
import accountLogo from '../../images/account.svg'
import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation(props) {
  console.log(props.main)
  return (
    <div className='navigation'>
      <div className='header__container-route'>
        <Link className={props.mainMovies ? 'header__link-header header__link-header-active' : 'header__link-header'} to='/movies'>
          Фильмы
        </Link>
        <Link className={props.mainSaved ? 'header__link-header header__link-header-saved header__link-header-active' : 'header__link-header header__link-header-saved '} to='/saved-movies'>
          Сохранённые фильмы
        </Link>
      </div>
      <div className='header__container-account'>
        <Link className={props.profile ? 'header__link-header header__link-header-active' : 'header__link-header'} to='/profile'>
          Аккаунт
        </Link>
        <div className='header__container-account-logo'>
          <img className='header__account-logo' src={accountLogo} alt='Иконка аккаунта' />
        </div>
      </div>
    </div>
  )
}
