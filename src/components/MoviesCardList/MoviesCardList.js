import './MoviesCardList.css'
import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { cardData } from '../../utils/cardData'

export default function MoviesCardList() {
  const [cardVisible, setCardVisible] = React.useState(16)

  const loadMore = () => {
    setCardVisible(cardVisible + 16)
  }

  const amountCard = cardVisible >= cardData.length

  return (
    <section className='movies'>
      <div className='movies__container'>
        {cardData.slice(0, cardVisible).map((el, index) => (
          <MoviesCard key={index} card={el} />
        ))}
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
