import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {

  return (
    <>
      <Header main={true} mainSaved={true} />
      <main>
        <SearchForm/>
        <MoviesCardList handleDelete = {props.handleDelete} cardData={props.cardData} mainSaved={true}/>
      </main>
      <Footer main={true}/>
    </>
  )
}