import React from "react";
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

export default function Movies(props) {

  return (
    <>
      <Header main={props.main} mainMovies={props.mainMovies}/>
      <main>
        <SearchForm getCardsByName={props.getCardsByName} handleToggle={props.handleToggle} isCheckedShorts={props.isCheckedShorts} getCardsByShorts={props.getCardsByShorts}/>
        <MoviesCardList main={props.main} cardData={props.cardData} getCards={props.getCards} films={props.films} stateSubmit={props.stateSubmit} isCheckedShorts={props.isCheckedShorts}/>
      </main>
      <Footer main={props.main}/>
    </>
  )
}