import './FilterCheckbox.css'
import React, { useState } from 'react'

export default function FilterCheckbox(props) {

  return (
    <label className="toggle-shorts">
      <input
        className="toggle-shorts__button"
        type="checkbox"
        checked={props.isCheckedShorts}
        onChange={props.handleToggle}
      />
      <span className="toggle-shorts__slider"></span>
    </label>
  );
}