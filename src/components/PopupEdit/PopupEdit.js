import { React, useContext, useEffect, useState } from 'react'
import './PopupEdit.css'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function PopupEdit(props) {
  const currentUser = useContext(CurrentUserContext)
  const [isStateInput, setIsStateInput] = useState(true)
  const [isName, setIsName] = useState(currentUser.currentUser.name)
  const [isEmail, setIsEmail] = useState(currentUser.currentUser.email)
  const [errorText, setErrorText] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleChangeName(event) {
    setIsName(event.target.value)
  }

  function handleChangeEmail(event) {
    setIsEmail(event.target.value)
  }

  const handleForm = (event) => {
    event.preventDefault()
  }

  const editButton = () => {
    setIsStateInput(!isStateInput)
  }

  const editButtonSave = () => {
    const nameInput = document.querySelector('.popup-edit__input-checked');
    if(nameInput.value.length >= 2 && nameInput.value.length <= 30) {
      setIsStateInput(!isStateInput)
    } else {
      return
    }
  }

  const editButtonCancel = () => {
      setIsStateInput(!isStateInput)
      setIsName(currentUser.currentUser.name);
      setIsEmail(currentUser.currentUser.email);
  }

  useEffect(() => {
    console.log(currentUser.isStateValidate.code)
    if (currentUser.isStateValidate.code === 200 && currentUser.isStateValidate.component === 'profile') {
      setIsStateInput(!isStateInput);
    } else if (currentUser.isStateValidate.code !== 200 && currentUser.isStateValidate.component === 'profile') {
      document.querySelector('.popup-edit__button-error').classList.add('popup-edit__button-error-active');
      if (currentUser.isStateValidate.code === 409) {
        setErrorText('Данный email уже зарегистрирован!');
      } else {
        setErrorText('Что то пошло не так... Обновите страницу');
      }
    }
  }, [currentUser.isStateValidate]);

  useEffect(() => {
    const valueInputName = document.querySelector('.popup-edit__input-name').value
    const valueInputEmail = document.querySelector('.popup-edit__input-email').value
    if(valueInputName === currentUser.currentUser.name && valueInputEmail === currentUser.currentUser.email ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
    console.log(isButtonDisabled)
  }, [isName, isEmail])


  function handleEditProfile() {
    const nameInput = document.querySelector('.popup-edit__input-checked');
    if(nameInput.value.length >= 2 && nameInput.value.length <= 30) {
      props.updateProfile({ name: isName, email: isEmail });
    } else {
      document.querySelector('.popup-edit__button-error').classList.add('popup-edit__button-error-active');
      setErrorText('Имя должно содержать от 2 до 30 символов!');
    }
  }

  return (
    <section className='popup-edit'>
      <h1 className='popup-edit__title'>Привет, Нейм!</h1>
      <form className='popup-edit__container' onSubmit={handleForm} noValidate>
        <div className='popup-edit__container-mini'>
          <p className={isStateInput ?'popup-edit__text' : 'popup-edit__text popup-edit__text-active'}>Имя</p>
          <input className='popup-edit__input popup-edit__input-checked popup-edit__input-name' type='text' placeholder='Иван' minLength="2" maxLength="30" disabled={isStateInput} value={isName} required onChange={handleChangeName} />
        </div>
        <div className='popup-edit__container-mini'>
          <p className={isStateInput ?'popup-edit__text' : 'popup-edit__text popup-edit__text-active'}>E-mail</p>
          <input className='popup-edit__input popup-edit__input-email' type='email' required disabled={isStateInput} placeholder='pochta@yandex.ru' value={isEmail} onChange={handleChangeEmail}/>
        </div>
        {isStateInput ? (
          <div className='popup-edit__button-container'>
            <button className='popup-edit__button-edit' type='button' onClick={editButton}>
              Редактировать
            </button>
            <button className='popup-edit__button-exit' type='button' onClick={props.tokenRemove}>Выйти из аккаунта</button>
          </div>
        ) : (
          <>
            <p className='popup-edit__button-error'>{errorText}</p>
            <button className={isButtonDisabled ? 'popup-edit__button-save popup-edit__button-save-disabled' : 'popup-edit__button-save'} type="submit" onClick={handleEditProfile} disabled={isButtonDisabled}>
              Сохранить
            </button>
            <button className='popup-edit__button-save popup-edit__button-save-cancel' type="submit" onClick={editButtonCancel}>
              Отмена
            </button>
          </>
        )}
      </form>
    </section>
  )
}
