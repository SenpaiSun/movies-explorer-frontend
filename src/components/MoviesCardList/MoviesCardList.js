import './MoviesCardList.css'
import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList(props) {
  const cards = props.cardData

  const [cardVisible, setCardVisible] = React.useState(16)

  const loadMore = () => {
    setCardVisible(cardVisible + 16)
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
