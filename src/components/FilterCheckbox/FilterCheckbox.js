import './FilterCheckbox.css'
import React, { useContext, useState } from 'react'
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'

export default function FilterCheckbox(props) {
  const CurrentUser = useContext(CurrentUserContext)

  function handleGetCards() {
      props.getCardsByShorts(props.inputValue, CurrentUser.isCheckedShorts);
  }

  return (
    <label className="toggle-shorts">
      <input
        className="toggle-shorts__button"
        type="checkbox"
        checked={CurrentUser.isCheckedShorts}
        onChange={() => {
          props.handleToggle()
          handleGetCards()
        }}
      />
      <span className="toggle-shorts__slider"></span>
    </label>
  );
}