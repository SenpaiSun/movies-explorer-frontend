import './MoviesCard.css'
import React from "react";

export default function MoviesCard(props) {
  const cardData = props.card

  const [isLike, setIsLike] = React.useState(false)

  const clickLike = () => {
    setIsLike(!isLike)
  }

  const clickDelete = () => {
    props.handleDelete(cardData._id)
  }

  return (
    <li className="card">
      <a href={cardData.trailerLink} target='_blank' rel='noreferrer' className="card__link">
        <img className="card__image" src={`https://api.nomoreparties.co/${cardData.image.url}`} alt={cardData.nameRU}/>
      </a>
      <div className="card__title">
        <h2 className="card__title-name">{cardData.nameRU}</h2>
        <button type='button' className={props.main ? (!isLike ? 'card__title-like' : 'card__title-like card__title-like-active') : 'card__title-like card__title-like-delete'} onClick={props.main ? clickLike : clickDelete}/>
      </div>
      <p className="card__duration">{cardData.duration}</p>
    </li>
  )
}