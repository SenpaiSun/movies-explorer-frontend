import React, { useContext } from "react";
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'


export default function Movies(props) {
  const CurrentUser = useContext(CurrentUserContext)

  return (
    CurrentUser.isLogged && (
    <>
      <Header main={props.main} mainMovies={props.mainMovies}/>
      <main>
        <SearchForm getCardsByName={props.getCardsByName} handleToggle={props.handleToggle} isCheckedShorts={props.isCheckedShorts} getCardsByShorts={props.getCardsByShorts}/>
        <MoviesCardList main={props.main} cardData={props.cardData} getCards={props.getCards} stateSubmit={props.stateSubmit} isCheckedShorts={props.isCheckedShorts} likeCard={props.likeCard} handleDelete={props.handleDelete}/>
      </main>
      <Footer main={props.main}/>
    </>
    )
  )
}