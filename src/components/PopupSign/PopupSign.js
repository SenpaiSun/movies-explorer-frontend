import React from 'react'
import logo from '../../images/logo.svg'
import './PopupSign.css'
import { Link } from 'react-router-dom'

export default function PopupSign(props) {
  return (
    <section className='main-register'>
      <form className='main-register__content'>
        <div className='main-register__container-logo'>
          <Link to='/'>
           <img src={logo} className='main-register__logo' alt='Логотип сервиса' />
          </Link>
        </div>
        <h3 className='main-register__title'>{props.title}</h3>
        {props.toRegister && (
          <>
            <div className='main-register__container-input'>
              <p className='main-register__input-name'>Имя</p>
              <input className='main-register__input' type='text' placeholder='Иван' minlength="2" maxlength="30" required/>
            </div>
            <span className='main-register__span'>
              <p className='main-register__error'>Что то пошло не так...</p>
            </span>
          </>
        )}
        <div className='main-register__container-input'>
          <p className='main-register__input-name'>E-mail</p>
          <input className='main-register__input' type='email' placeholder='pochta@yandex.ru' required/>
        </div>
        <span className='main-register__span'>
          <p className='main-register__error'>Что то пошло не так...</p>
        </span>
        <div className='main-register__container-input'>
          <p className='main-register__input-name'>Пароль</p>
          <input className='main-register__input main-register__input-error' type='password' placeholder='Пароль' minlength="6" maxlength="30" required/>
        </div>
        <span className='main-register__span'>
          <p className='main-register__error main-register__error-active'>Что то пошло не так...</p>
        </span>
        <div className='main-register__container-button'>
          <button type='submit' className={props.toRegister ? 'main-register__button-register main-register__button-register-margin' : 'main-register__button-register main-register__button-login'}>
            {props.buttonText}
          </button>
          <div className='main-register__container-link'>
            <p className='main-register__text'>{props.textRedirect}</p>
            <span className='main-register__span'>
              <Link to={props.toRegister ? '/signin' : '/signup'} className='main-register__redirect'>
                {props.textLink}
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  )
}
