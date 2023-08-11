import React from "react";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list_item">
          <a className="portfolio__list_item_link" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/how-to-learn">Статичный сайт</a>
          <a className="portfolio__list_item_link  portfolio__list_item_link-arrow" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/how-to-learn">↗</a>
        </li>
        <li className="portfolio__list_item">
          <a className="portfolio__list_item_link" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/russian-travel">Адаптивный сайт</a>
          <a className="portfolio__list_item_link  portfolio__list_item_link-arrow" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/russian-travel">↗</a>
        </li>
        <li className="portfolio__list_item">
          <a className="portfolio__list_item_link" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/mesto-react">Одностраничное приложение</a>
          <a className="portfolio__list_item_link portfolio__list_item_link-arrow" target="_blank" rel="noreferrer" href="https://github.com/SenpaiSun/mesto-react">↗</a>
        </li>
      </ul>
    </section>
  )
}