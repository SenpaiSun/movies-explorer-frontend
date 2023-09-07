import React, { useContext, useEffect, useState } from 'react'
import logo from '../../images/logo.svg'
import './PopupSign.css'
import { Link, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function PopupSign(props) {
  const currentUser = useContext(CurrentUserContext)
  const [isName, setIsName] = useState('')
  const [isEmail, setIsEmail] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [errorTextPassword, setErrorTextPassword] = useState('')
  const [errorTextEmail, setErrorTextEmail] = useState('')
  const [errorTextName, setErrorTextName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const location = useLocation()

  useEffect(() => {
      if (currentUser.isStateValidate.code !== 200 && currentUser.isStateValidate.component === 'login') {
        document.querySelector('.main-register__error-password').classList.add('main-register__error-active');
        if (currentUser.isStateValidate.code === 401) {
          setErrorTextPassword('Неверный логин или пароль');
        } else {
          setErrorTextPassword('Произошла ошибка, обновите страницу');
        }
    }
    if (currentUser.isStateValidate.code !== 200 && currentUser.isStateValidate.component === 'register') {
      document.querySelector('.main-register__error-password').classList.add('main-register__error-active');
      if (currentUser.isStateValidate.code === 401) {
        setErrorTextPassword('Неверный логин или пароль');
      } else if (currentUser.isStateValidate.code === 409) {
        setErrorTextPassword('Такой email уже зарегистрирован!');
      } else {
        setErrorTextPassword('Произошла ошибка, обновите страницу');
      }
  }
  }, [currentUser.isStateValidate]);

  useEffect(() => {
    resetValidate();
  }, [location.pathname]);

  const resetValidate = () => {
    const errorPassword = document.querySelector('.main-register__error-password');
    const errorName = document.querySelector('.main-register__error-name');
    const errorEmail = document.querySelector('.main-register__error-email');

    if (errorPassword) {
      errorPassword.classList.remove('main-register__error-active');
    }

    if (errorName) {
      errorName.classList.remove('main-register__error-active');
    }

    if (errorEmail) {
      errorEmail.classList.remove('main-register__error-active');
    }
  }

  const handleNameChange = (event) => {
    setIsName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setIsEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setIsPassword(event.target.value)
  }

  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if(isName.length < 2 && location.pathname === '/signup') {
      setIsButtonDisabled(true)
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-name').classList.add('main-register__error-active');
      setErrorTextName('Имя должно содержать минимум 2 буквы!')
    } else if(!isValidEmail(isEmail)){
      setIsButtonDisabled(true)
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      location.pathname === '/signup' && document.querySelector('.main-register__error-name').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-email').classList.add('main-register__error-active');
      setErrorTextEmail('Введите корректный email')
    } else if(isPassword.length < 6){
      setIsButtonDisabled(true)
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      location.pathname === '/signup' && document.querySelector('.main-register__error-name').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-password').classList.add('main-register__error-active');
      setErrorTextPassword('Пароль должен содержать минимум 6 символов!')
    } else {
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      location.pathname === '/signup' && document.querySelector('.main-register__error-name').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      setIsButtonDisabled(false)
    }
  }, [isName, isEmail, isPassword]);

  function handleRegister(event) {
    event.preventDefault()
    if (isValidEmail(isEmail) && isPassword.length >= 6 && isName.length >= 2) {
      props.toRegisterApi({ name: isName, email: isEmail, password: isPassword })
    } else if (!isValidEmail(isEmail)){
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-name').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-email').classList.add('main-register__error-active');
      setErrorTextEmail('Введите корректный email')
    } else if(isPassword.length < 6){
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-name').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-password').classList.add('main-register__error-active');
      setErrorTextPassword('Пароль должен содержать минимум 6 символов!')
    } else if(isName.length < 2) {
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-name').classList.add('main-register__error-active');
      setErrorTextName('Имя должно содержать минимум 2 буквы!')
    }
  }

  function handleLogin(event) {
    event.preventDefault()
    if (isValidEmail(isEmail) && isPassword.length >= 6) {
      props.toLoginApi({email: isEmail, password: isPassword})
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
    } else if (!isValidEmail(isEmail)){
      document.querySelector('.main-register__error-password').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-email').classList.add('main-register__error-active');
      setErrorTextEmail('Введите корректный email')
    } else if(isPassword.length < 6){
      document.querySelector('.main-register__error-email').classList.remove('main-register__error-active');
      document.querySelector('.main-register__error-password').classList.add('main-register__error-active');
      setErrorTextPassword('Пароль должен содержать минимум 6 символов!')
    }
  }

  return (
    <section className='main-register'>
      <form className='main-register__content' onSubmit={props.toRegister ? handleRegister : handleLogin} noValidate>
        <div className='main-register__container-logo'>
          <Link to='/'>
            <img src={logo} className='main-register__logo' alt='Логотип сервиса' />
          </Link>
        </div>
        <h1 className='main-register__title'>{props.title}</h1>
        {props.toRegister && (
          <>
            <div className='main-register__container-input'>
              <p className='main-register__input-name'>Имя</p>
              <input className='main-register__input' type='text' placeholder='Иван' minLength='2' maxLength='30' required value={isName} onChange={handleNameChange} />
            </div>
            <span className='main-register__span'>
              <p className='main-register__error main-register__error-name'>{errorTextName}</p>
            </span>
          </>
        )}
        <div className='main-register__container-input'>
          <p className='main-register__input-name'>E-mail</p>
          <input className='main-register__input' type='email' placeholder='pochta@yandex.ru' required value={isEmail} onChange={handleEmailChange} />
        </div>
        <span className='main-register__span'>
          <p className='main-register__error main-register__error-email'>{errorTextEmail}</p>
        </span>
        <div className='main-register__container-input'>
          <p className='main-register__input-name'>Пароль</p>
          <input className='main-register__input' type='password' placeholder='Пароль' minLength='6' maxLength='30' required value={isPassword} onChange={handlePasswordChange} />
        </div>
        <span className='main-register__span'>
          <p className='main-register__error main-register__error-password'>{errorTextPassword}</p>
        </span>
        <div className='main-register__container-button'>
          <button type='submit' disabled={isButtonDisabled} className={props.toRegister ? `main-register__button-register main-register__button-register-margin ${isButtonDisabled ? 'main-register__button-register-disabled' : ''}` : `main-register__button-register main-register__button-login ${isButtonDisabled ? 'main-register__button-register-disabled' : ''}`} >
            {props.buttonText}
          </button>
          <div className='main-register__container-link'>
            <p className='main-register__text'>{props.textRedirect}</p>
            <span className='main-register__span'>
              <Link to={props.toRegister ? '/signin' : '/signup'} className='main-register__redirect' onClick={resetValidate}>
                {props.textLink}
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  )
}
