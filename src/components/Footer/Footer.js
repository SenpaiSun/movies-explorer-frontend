import './Footer.css'
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__title">
        <h4 className="footer__title_item">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      </div>
      <div className="footer__nav">
        <p className="footer__nav_copyright">&copy; 2023</p>
        <ul className="footer__nav_list">
          <li className="footer__nav_item">
            <a className="footer__nav_item-link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__nav_item">
            <a className="footer__nav_item-link" href="https://github.com/SenpaiSun" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
