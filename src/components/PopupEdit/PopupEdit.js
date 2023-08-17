import { React, useState } from 'react'
import './PopupEdit.css'

export default function PopupEdit() {
  const [isStateInput, setIsStateInput] = useState(true)

  const handleForm = (event) => {
    event.preventDefault()
  }

  const editButton = () => {
    setIsStateInput(!isStateInput)
  }

  return (
    <main className='popup-edit'>
      <h4 className='popup-edit__title'>Привет, Нейм!</h4>
      <form className='popup-edit__container' onSubmit={handleForm}>
        <div className='popup-edit__container_mini'>
          <p className='popup-edit__text'>Имя</p>
          <input className='popup-edit__input' disabled={isStateInput} />
        </div>
        <div className='popup-edit__container_mini'>
          <p className='popup-edit__text'>E-mail</p>
          <input className='popup-edit__input' disabled={isStateInput} />
        </div>
        {isStateInput ? (
          <div className='popup-edit__button-container'>
            <button className='popup-edit__button-edit' onClick={editButton}>
              Редактировать
            </button>
            <button className='popup-edit__button-exit'>Выйти из аккаунта</button>
          </div>
        ) : (
          <>
            <p className='popup-edit__button-error popup-edit__button-error-active'>При обновлении профиля произошла ошибка.</p>
            <button className='popup-edit__button-save' onClick={editButton}>
              Сохранить
            </button>
          </>
        )}
      </form>
    </main>
  )
}
