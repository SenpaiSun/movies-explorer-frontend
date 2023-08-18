import React from "react";
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

export default function Movies(props) {
  return (
    <>
      <Header main={props.main} mainMovies={props.mainMovies}/>
      <SearchForm/>
      <MoviesCardList main={props.main} cardData={props.cardData}/>
      <Footer/>
    </>
  )
}