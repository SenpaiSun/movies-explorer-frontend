import React from "react"

export default function ToggleShorts() {
  return (
    <label className="toggle-shorts">
      <input className="toggle-shorts__button" type="checkbox"/>
      <span className="toggle-shorts__slider"></span>
    </label>
  )
}
