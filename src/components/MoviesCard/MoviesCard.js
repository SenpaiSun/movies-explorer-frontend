import './MoviesCard.css'
import React from "react";

export default function MoviesCard(props) {
  const cardData = props.card

  const [isLike, setIsLike] = React.useState(false)

  const clickLike = () => {
    setIsLike(!isLike)
  }

  return (
    <li className="card">
      <a href={cardData.trailerLink} target='_blank' rel='noreferrer' className="card__link">
        <img className="card__image" src={cardData.image} alt={cardData.nameRU}/>
      </a>
      <div className="card__title">
        <h2 className="card__title_name">{cardData.nameRU}</h2>
        <button className={props.main ? (!isLike ? 'card__title_like' : 'card__title_like card__title_like-active') : 'card__title_like card__title_like-delete'} onClick={clickLike}/>
      </div>
      <p className="card__duration">{cardData.duration}</p>
    </li>
  )
}