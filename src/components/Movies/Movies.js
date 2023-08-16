import React from "react";
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import Preloader from "../Preloader/Preloader";

export default function Movies(props) {
  return (
    <>
      <Header main={props.main}/>
      <SearchForm/>
      <MoviesCardList main={props.main}/>
      <Footer/>
    </>
  )
}