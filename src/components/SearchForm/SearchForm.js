import './SearchForm.css'
import React from "react";
import searchLogo from '../../images/icon.svg'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {

  return (
    <section className="search-form">
      <div className="search-form__container">
        <img className="search-form__logo" src={searchLogo} alt="Иконка лупы"></img>
        <input className="search-form__input" placeholder="Фильм"/>
        <button className="search-form__button-search" type="submit">Найти</button>
          <div className="search-form__button-short">
            <FilterCheckbox/>
          </div>
          <p className="search-form__shortfilms">Короткометражки</p>
      </div>
    </section>
  )
}