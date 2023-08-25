import './Portfolio.css'
import React from 'react'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a className='portfolio__list-item-container' target='_blank' rel='noreferrer' href='https://github.com/SenpaiSun/how-to-learn'>
            <p className='portfolio__list-item-link'>Статичный сайт</p>
            <p className='portfolio__list-item-link  portfolio__list-item-link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__list-item-container' target='_blank' rel='noreferrer' href='https://github.com/SenpaiSun/russian-travel'>
            <p className='portfolio__list-item-link'>Адаптивный сайт</p>
            <p className='portfolio__list-item-link  portfolio__list-item-link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__list-item-container' target='_blank' rel='noreferrer' href='https://github.com/SenpaiSun/mesto-react'>
            <p className='portfolio__list-item-link'>Одностраничное приложение</p>
            <p className='portfolio__list-item-link  portfolio__list-item-link-arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
