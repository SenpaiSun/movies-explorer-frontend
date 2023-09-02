import './MoviesCardList.css'
import React, { useContext, useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList(props) {

  const CurrentUser = useContext(CurrentUserContext)
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let cardAmount

  if(windowSize <= 480) {
    cardAmount = 5
  } else if (windowSize <= 768) {
    cardAmount = 8
  } else if (windowSize <= 1569){
    cardAmount = 16
  } else {
    cardAmount = 20
  }

  const cards = props.films

  const [cardVisible, setCardVisible] = React.useState(cardAmount)

  const loadMore = () => {
    if (windowSize <= 768) {
      setCardVisible(cardVisible + 2)
    } else if (windowSize <= 1569){
      setCardVisible(cardVisible + 4)
    } else {
      setCardVisible(cardVisible + 5)
    }
  }

  const amountCard = cardVisible >=cards.length

  return (
    <section className='movies'>
      <div className={ cards.length !== 0 ? 'movies__container' : 'movies__container movies__container-not-found'}>
        {cards.length !== 0 ? (cards.slice(0, cardVisible).map((el) => (
          <MoviesCard handleDelete = {props.handleDelete} mainSaved={props.mainSaved} main={props.main} key={el.id} card={el} />
        ))) : ( CurrentUser.isLoading ? <Preloader/> : (props.stateSubmit ? <p className='movies__not-found-card'>Похоже, ничего не найдено..</p> : ''))}
      </div>
      <div className='movies__load'>
        {!amountCard && (
          <button className='movies__load-button' type='button' onClick={loadMore}>
            Еще
          </button>
        )}
      </div>
    </section>
  )
}
