import './Footer.css'
import React, { useEffect, useState } from 'react'

export default function Footer(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <footer className='footer'>
      <div className={props.main ? 'footer__title footer__title-main' : 'footer__title'}>
        <h4 className='footer__title-item'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      </div>
      <div className='footer__nav'>
        <p className='footer__nav-copyright' dangerouslySetInnerHTML={{ __html: windowSize > 440 ? '&copy; 2023' : '&copy; 2023' }}></p>
        <ul className='footer__nav-list'>
          <li className='footer__nav-item footer__nav-item-practicum'>
            <a className='footer__nav-item-link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__nav-item'>
            <a className='footer__nav-item-link' href='https://github.com/SenpaiSun' target='_blank' rel='noreferrer'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
