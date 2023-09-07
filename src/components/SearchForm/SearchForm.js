import './SearchForm.css'
import React, { useContext, useEffect, useState } from 'react'
import searchLogo from '../../images/icon.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'


export default function SearchForm(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [inputValue, setInputValue] = useState(() => {
    const currentRoute = window.location.pathname
    const savedInputValues = JSON.parse(localStorage.getItem('inputValues')) || {}
    return savedInputValues[currentRoute] || ''
  })

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }


  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])



  function handleSearchCard(event) {
    const currentRoute = window.location.pathname
    const savedInputValues = JSON.parse(localStorage.getItem('inputValues')) || {}
    savedInputValues[currentRoute] = inputValue
    localStorage.setItem('inputValues', JSON.stringify(savedInputValues))

    event.preventDefault()
    const errorValidation = document.querySelector('.search-form__error')
    if (inputValue.length > 0) {
      errorValidation.classList.remove('search-form__error-active')
      props.getCardsByName(inputValue)
    } else {
      errorValidation.classList.add('search-form__error-active')
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSearchCard} noValidate>
        <div className='search-form__settings-input'>
          {windowSize > 690 && <img className='search-form__logo' src={searchLogo} alt='Иконка лупы'></img>}
          <input className='search-form__input' placeholder='Фильм' type='search' required value={inputValue} onChange={handleInputChange} />
          <button className='search-form__button-search' type='submit'>
            Найти
          </button>
        </div>
        <div className='search-form__settings-toggle'>
          <div className='search-form__button-short'>
            <FilterCheckbox handleToggle={props.handleToggle} isCheckedShorts={props.isCheckedShorts} getCardsByName={props.getCardsByName} getCardsByShorts={props.getCardsByShorts} inputValue={inputValue} />
          </div>
          <p className='search-form__shortfilms'>Короткометражки</p>
        </div>
      </form>
      <p className='search-form__error'>Нужно ввести ключевое слово</p>
    </section>
  )
}
