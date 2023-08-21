import './AboutMe.css'
import React from "react";
import Title from "../Title/Title";
import myPhoto from "../../images/photo_2022-02-22_21-18-15.jpg"

export default function AboutMe() {
  return (
    <section className="about-me">
      <Title titleMargin={'title__student-margin'} marginSelector={'title__margin-student'} titleName='Студент'/>
        <div className="about-me__container">
          <div className="about-me__info">
            <h3 className="about-me__info_name">Максим</h3>
            <p className="about-me__info_prof">Фронтенд-разработчик, 25 лет</p>
            <p  className="about-me__info_me">Окончил ВУЗ по направлению "Таможенное дело". В процессе понял, что не мое, но решил выйти на диплом. После выпуска, успел поработать тестировщиком, саппортом, тимлидом саппорта. Начал проявлять интерес к фронтенду в 2022 году.</p>
            <a className="about-me__info_github" rel="noreferrer" target="_blank" href="https://github.com/SenpaiSun">Github</a>
          </div>
          <div className="about-me__photo">
            <img  className="about-me__photo_me" src={myPhoto} alt="Мое фото"/>
          </div>
        </div>
    </section>
  )
}