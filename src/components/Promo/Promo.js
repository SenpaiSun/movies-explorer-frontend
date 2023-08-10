import React from "react";
import promoLogo from '../../images/text__COLOR_landing-logo.png'

export default function Promo() {
  return(
    <section className="promo">
      <h1 className="promo__text">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src={promoLogo} alt="Промо-логотип"/>
    </section>
  )
}