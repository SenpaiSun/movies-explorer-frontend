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


  useEffect(() => {
    setCards(CurrentUser.searchFilms)
  }, [CurrentUser.searchFilms])


  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('films')))
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
    if(CurrentUser.searchFilmsSaved.length !== 0) {
      setSavedFilms(CurrentUser.searchFilmsSaved || [])
    } else if (CurrentUser.searchFilms.length !== 0) {
      setCards(CurrentUser.searchFilms || [])
    }

  }, [CurrentUser.searchFilmsSaved, CurrentUser.searchFilms])


  let cardAmount

  useEffect(() => {
    console.log('asdasd')
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
  const savedFilmsSelect = (savedFilms !== null ? savedFilms : [])
  const amountCard = cardVisible >= (currentPath === '/movies' ? cardsSelect : savedFilmsSelect).length

  return (
    <section className='movies'>
      <div className={ (props.main ? cardsSelect : savedFilmsSelect).length !== 0 ? 'movies__container' : 'movies__container movies__container-not-found'}>
        {(cardsSelect) && (props.main ? cardsSelect : savedFilmsSelect).length !== 0 ? ((props.main ? cards : savedFilms).slice(0, cardVisible).map((el) => (
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
