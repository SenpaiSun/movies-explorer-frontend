import './MoviesCardList.css'
import React, { useContext, useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList(props) {
  const currentPath = window.location.pathname
  const CurrentUser = useContext(CurrentUserContext)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [savedFilms, setSavedFilms] = useState(CurrentUser.isSavedFilms)
  const [cards, setCards] = useState(CurrentUser.searchFilms)
  const [stateLocalstorage, isStateLocalstorage] = useState(false)
  const [stateFilms, isStateFilms] = useState(false)

  useEffect(() => {
    isStateFilms(true)
  }, [cards])

  useEffect(() => {
    setSavedFilms(CurrentUser.searchFilmsSaved)
  }, [CurrentUser.searchFilmsSaved])

  useEffect(() => {
    setCards(CurrentUser.searchFilms)
  }, [CurrentUser.searchFilms])

  useEffect(() => {
    if(currentPath === '/saved-movies') {
      props.getSavedCard()
      const filmsJSON = localStorage.getItem('films-saved');
      setSavedFilms(JSON.parse(filmsJSON))
    }
    if(localStorage.getItem('films')) {
      const filmsJSON = localStorage.getItem('films');
      setCards(JSON.parse(filmsJSON))
    }
  }, [])

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [CurrentUser.isSavedFilms])

  useEffect(() => {
    isStateLocalstorage(true)
    if(stateLocalstorage === true && currentPath === '/movies') {
      const filmsJSON = JSON.stringify(CurrentUser.searchFilms);
      localStorage.setItem('films', filmsJSON);
    }
    if (CurrentUser.searchFilms.length !== 0) {
      setCards(CurrentUser.searchFilms || [])
    }

  }, [CurrentUser.searchFilmsSaved, CurrentUser.searchFilms])


  let cardAmount

  useEffect(() => {
    if(currentPath === '/movies') {
      if(windowSize <= 712) {
        cardAmount = 5
      } else if (windowSize <= 989) {
        cardAmount = 8
      } else if (windowSize <= 1279){
        cardAmount = 12
      } else if (windowSize <= 1569){
        cardAmount = 16
      } else {
        cardAmount = 20
      }
    } else {
      cardAmount = Infinity;
    }
    setCardVisible(cardAmount)
  }, [cards])

  function amountCardAdded() {
    if(currentPath === '/movies') {
      if(windowSize <= 712) {
        cardAmount = 5
      } else if (windowSize <= 989) {
        cardAmount = 8
      } else if (windowSize <= 1279){
        cardAmount = 12
      } else if (windowSize <= 1569){
        cardAmount = 16
      } else {
        cardAmount = 20
      }
    } else {
      cardAmount = Infinity;
    }
  }
  amountCardAdded()

  const [cardVisible, setCardVisible] = React.useState(cardAmount)

  const loadMore = () => {
    if (windowSize <= 989) {
      setCardVisible(cardVisible + 2)
    } else if (windowSize <= 1279){
      setCardVisible(cardVisible + 3)
    } else if (windowSize <= 1569){
      setCardVisible(cardVisible + 4)
    } else {
      setCardVisible(cardVisible + 5)
    }
  }

  const cardsSelect = (cards !== null ? cards : [])
  const savedFilmsSelect = (savedFilms !== null  ? savedFilms : [])
  const amountCard = cardVisible >= (currentPath === '/movies' ? cardsSelect : savedFilmsSelect).length

  return stateFilms && (
    <section className='movies'>
      <div className={ (props.main ? cardsSelect : savedFilmsSelect).length !== 0 ? 'movies__container' : 'movies__container movies__container-not-found'}>
        {(props.main ? cardsSelect : (props.stateSubmit ? savedFilmsSelect : CurrentUser.isSavedFilms)).length !== 0 ? ((props.main ? cards : savedFilms).slice(0, cardVisible).map((el) => (
          <MoviesCard handleDelete = {props.handleDelete} mainSaved={props.mainSaved} main={props.main} key={el._id || el.id} card={el} likeCard={props.likeCard}/>
        ))) : ( CurrentUser.isLoading ? <Preloader/> : (props.stateSubmit ? <p className='movies__not-found-card'>Похоже, ничего не найдено..</p> : ''))}
      </div>
      <div className='movies__load'>
        {currentPath === '/movies' && (!amountCard && (
          <button className='movies__load-button' type='button' onClick={loadMore}>
            Еще
          </button>
        ))}
      </div>
    </section>
  )
}
