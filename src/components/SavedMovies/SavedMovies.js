import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {

  return (
    <>
      <Header main={props.main} mainSaved={props.mainSaved}/>
      <SearchForm/>
      <MoviesCardList handleDelete = {props.handleDelete} cardData={props.cardData} mainSaved={props.mainSaved}/>
      <Footer main={props.main}/>
    </>
  )
}