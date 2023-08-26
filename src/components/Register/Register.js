import React from "react";
import PopupSign from '../PopupSign/PopupSign'

export default function Register(props) {
  return (
    <main>
      <PopupSign title={props.title} buttonText={props.buttonText} textRedirect={props.textRedirect} textLink={props.textLink} toRegister={props.toRegister}/>
    </main>
  )
}