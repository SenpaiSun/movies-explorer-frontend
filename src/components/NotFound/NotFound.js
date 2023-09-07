import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import './NotFound.css'

export default function NotFound() {
  const redirect = useNavigate()
  const goBack = () => {
    redirect(-1);
  };
  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='not-found__link' to='#' onClick={goBack}>Назад</Link>
    </section>
  )
}