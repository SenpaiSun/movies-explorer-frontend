import { React, useContext, useState } from 'react'
import './PopupEdit.css'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function PopupEdit(props) {
  const currentUser = useContext(CurrentUserContext)
  const [isStateInput, setIsStateInput] = useState(true)
  const [isName, setIsName] = useState(currentUser.currentUser.name)
  const [isEmail, setIsEmail] = useState(currentUser.currentUser.email)

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

  const goBack = () => {
    window.history.go(-1)
  }

  return (
    <section className='popup-edit'>
      <h1 className='popup-edit__title'>Привет, Нейм!</h1>
      <form className='popup-edit__container' onSubmit={handleForm}>
        <div className='popup-edit__container-mini'>
          <p className={isStateInput ?'popup-edit__text' : 'popup-edit__text popup-edit__text-active'}>Имя</p>
          <input className='popup-edit__input popup-edit__input-checked' type='text' placeholder='Иван' minLength="2" maxLength="30" disabled={isStateInput} value={isName} required onChange={handleChangeName}/>
        </div>
        <div className='popup-edit__container-mini'>
          <p className={isStateInput ?'popup-edit__text' : 'popup-edit__text popup-edit__text-active'}>E-mail</p>
          <input className='popup-edit__input' type='email' required disabled={isStateInput} placeholder='pochta@yandex.ru' value={isEmail} onChange={handleChangeEmail}/>
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
            <p className='popup-edit__button-error popup-edit__button-error-active'>При обновлении профиля произошла ошибка.</p>
            <button className='popup-edit__button-save' type="submit" onClick={editButtonSave}>
              Сохранить
            </button>
          </>
        )}
      </form>
    </section>
  )
}
