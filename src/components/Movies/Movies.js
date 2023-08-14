import React from "react";
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies(props) {
  return (
    <>
      <Header main={props.main}/>
      <SearchForm/>
      <MoviesCardList/>
    </>
  )
}