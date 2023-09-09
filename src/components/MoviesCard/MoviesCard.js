import './MoviesCard.css'
import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function MoviesCard(props) {

  const currentPath = window.location.pathname
  const CurrentUser = useContext(CurrentUserContext)
  const cardData = props.card
  const image = `https://api.nomoreparties.co/${cardData.image.url}`
  const [isDeleted, setIsDeleted] = React.useState(false);

  const savedCard = {
    country: cardData.country || 'Неизвестно',
    director: cardData.director,
    duration: cardData.duration,
    year: cardData.year,
    description: cardData.description,
    image: 'https://api.nomoreparties.co' + cardData.image.url,
    trailerLink: cardData.trailerLink,
    nameRU: cardData.nameRU,
    nameEN: cardData.nameEN,
    thumbnail: 'https://api.nomoreparties.co' + cardData.thumbnail,
    movieId: cardData.id,
    owner: CurrentUser.currentUser.id
  }


  const [isLike, setIsLike] = React.useState(false);

  useEffect(() => {
    isLiked();
  }, [CurrentUser.isSavedFilms]);

  function isLiked(){
    const liked = CurrentUser.isSavedFilms && CurrentUser.isSavedFilms.some(savedCard => savedCard.movieId === cardData.id);
    setIsLike(liked);
  }

  const clickLike = () => {
    setIsLike(!isLike)
    if(!isLike) {
      props.likeCard(savedCard);
    } else {
      props.handleDelete(cardData.id);
    }
  }

  const clickDelete = () => {
    if(currentPath === '/saved-movies') {
      setIsDeleted(true);
    }
    props.handleDelete(cardData.movieId)
  }

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours}ч `;
    }

    if (remainingMinutes > 0) {
      result += `${remainingMinutes}мин`;
    }

    return result;
  }
  function handleLikeCard() {
    clickLike()
  }

  return !isDeleted ? (
    <li className="card">
      <a href={cardData.trailerLink} target='_blank' rel='noreferrer' className="card__link">
        <img className="card__image" src={currentPath === '/movies' ? image : cardData.image} alt={cardData.nameRU}/>
      </a>
      <div className="card__title">
        <h2 className="card__title-name">{cardData.nameRU}</h2>
        <button type='button' className={props.main ? (!isLike ? 'card__title-like' : 'card__title-like card__title-like-active') : 'card__title-like card__title-like-delete'} onClick={currentPath === '/movies' ?  handleLikeCard : clickDelete}/>
      </div>
      <p className="card__duration">{formatDuration(cardData.duration)}</p>
    </li>
  ) : null
}