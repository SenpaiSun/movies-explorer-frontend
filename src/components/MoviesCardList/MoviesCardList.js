import './MoviesCardList.css'
import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { cardData } from '../../utils/cardData'

export default function MoviesCardList(props) {
  const [cardVisible, setCardVisible] = React.useState(16)

  const loadMore = () => {
    setCardVisible(cardVisible + 16)
  }

  const amountCard = cardVisible >= cardData.length

  return (
    <section className='movies'>
      <div className='movies__container'>
        {cardData.slice(0, cardVisible).map((el, index) => (
          <MoviesCard mainSaved={props.mainSaved} main={props.main} key={index} card={el} />
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
