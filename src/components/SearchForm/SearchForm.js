import './SearchForm.css'
import React, { useEffect, useState } from "react";
import searchLogo from '../../images/icon.svg'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

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
    event.preventDefault()
    const inputValue = document.querySelector('.search-form__input').value
    console.log(inputValue)
    props.getCardsByName(inputValue)
  }

  return (
    <section className="search-form">
      <form className="search-form__container">
        <div className='search-form__settings-input'>
          {windowSize > 690 && <img className="search-form__logo" src={searchLogo} alt="Иконка лупы"></img>}
          <input className="search-form__input" placeholder="Фильм" type='search' required/>
          <button className="search-form__button-search" type="submit" onClick={handleSearchCard}>Найти</button>
        </div>
        <div className='search-form__settings-toggle'>
          <div className="search-form__button-short">
            <FilterCheckbox handleToggle={props.handleToggle} isCheckedShorts={props.isCheckedShorts}/>
          </div>
          <p className="search-form__shortfilms">Короткометражки</p>
        </div>
      </form>
    </section>
  )
}