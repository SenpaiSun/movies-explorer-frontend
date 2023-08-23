import './MoviesCardList.css'
import React, { useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList(props) {
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
  if(windowSize <= 440) {
    cardAmount = 5
  } else if (windowSize <= 768) {
    cardAmount = 8
  } else {
    cardAmount = 16
  }

  const cards = props.cardData

  const [cardVisible, setCardVisible] = React.useState(cardAmount)

  const loadMore = () => {
    setCardVisible(cardVisible + cardAmount)
  }

  const amountCard = cardVisible >=cards.length

  return (
    <section className='movies'>
      <div className={ cards.length !== 0 ? 'movies__container' : 'movies__container movies__container-not-found'}>
        {cards.length !== 0 ? (cards.slice(0, cardVisible).map((el) => (
          <MoviesCard handleDelete = {props.handleDelete} mainSaved={props.mainSaved} main={props.main} key={el._id} card={el} />
        ))) : <p className='movies__not-found-card'>Похоже, ничего не найдено..</p>}
      </div>
      <div className='movies__load'>
        {!amountCard && (
          <button className='movies__load_button' onClick={loadMore}>
            Еще
          </button>
        )}
      </div>
    </section>
  )
}
