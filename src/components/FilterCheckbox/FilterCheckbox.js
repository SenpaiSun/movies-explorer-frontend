import './FilterCheckbox.css'
import React, { useContext, useEffect} from 'react'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function FilterCheckbox(props) {
  const currentPath = window.location.pathname
  const CurrentUser = useContext(CurrentUserContext)

  function handleGetCards() {
      props.getCardsByShorts(props.inputValue, (currentPath === '/movies' ? CurrentUser.isCheckedShorts : CurrentUser.isCheckedShortsSaved));
  }
  

  return (
    <label className="toggle-shorts">
      <input
        className="toggle-shorts__button"
        type="checkbox"
        checked={currentPath === '/movies' ? CurrentUser.isCheckedShorts : CurrentUser.isCheckedShortsSaved}
        onChange={() => {
          props.handleToggle()
          handleGetCards()
        }}
      />
      <span className="toggle-shorts__slider"></span>
    </label>
  );
}