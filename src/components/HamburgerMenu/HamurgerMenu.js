import './HamburgerMenu.css'
import { Link, useLocation } from "react-router-dom";
import accountLogo from '../../images/account.svg'
import { useEffect, useState } from 'react';

export default function HamurgerMenu(props) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    props.onClick();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);


  return (
    <section className="hamburger">
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={handleClick}>
        <div className="hamburger-menu__line hamburger-menu__top"/>
        <div className="hamburger-menu__line hamburger-menu__mid"/>
        <div className="hamburger-menu__line hamburger-menu__bot"/>
      </div>
      <div className={isOpen ? "hamburger-menu__container open" : 'hamburger-menu__container-disabled'}>
        {isOpen && <div className="hamburger-menu-overlay" onClick={handleClick} />}
        <nav className={isOpen ? "hamburger-menu__container-routes" : 'hamburger-menu__container-disabled'}>
          <div className="hamburger-menu__container-links">
            <Link className={location.pathname === '/' ? "hamburger-menu__route hamburger-menu__route-location" : "hamburger-menu__route"} to='/'>Главная</Link>
            <Link className={location.pathname === '/movies' ? "hamburger-menu__route hamburger-menu__route-location" : "hamburger-menu__route"} to='/movies'>Фильмы</Link>
            <Link className={location.pathname === '/saved-movies' ? "hamburger-menu__route hamburger-menu__route-location" : "hamburger-menu__route"} to='/saved-movies'>Сохранённые фильмы</Link>
          </div>
          <div className='header-menu__container-account'>
            <Link className="hamburger-menu__route-account" to='/profile'>
              Аккаунт
            </Link>
            <div className='hamburger-menu__container-account-logo'>
              <img className='hamburger-menu__account-logo' src={accountLogo} alt='Иконка аккаунта' />
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}