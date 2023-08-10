import React from "react";
import logo from "../../images/logo.png"
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <section className="header">
      <img className="header__logo" src={logo} alt="Логотип сервиса drow-films"/>
      <div className="header__container">
        <Link to="/" className="header__link-register">Регистрация</Link>
        <div className="header__container-link">
          <Link to="/" className="header__link-signin">Войти</Link>
        </div>
      </div>
    </section>
  )
}