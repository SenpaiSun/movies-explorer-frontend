import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function SavedMovies(props) {
  const CurrentUser = useContext(CurrentUserContext)

  return (
    CurrentUser.isLogged && (
      <>
        <Header main={true} mainSaved={true} />
        <main>
          <SearchForm getCardsByName={props.getCardsByName} handleToggle={props.handleToggle} isCheckedShorts={props.isCheckedShorts} getCardsByShorts={props.getCardsByShorts} />
          <MoviesCardList handleDelete = {props.handleDelete} cardData={props.cardData} mainSaved={true} isSavedFilms={props.isSavedFilms} getCardsByShorts={props.getCardsByShorts} handleToggle={props.handleToggle} getSavedCard={props.getSavedCard} stateSubmit={props.stateSubmit}/>
        </main>
        <Footer main={true}/>
      </>
    )
  )
}