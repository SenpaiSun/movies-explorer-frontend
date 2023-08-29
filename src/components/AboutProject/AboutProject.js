import './AboutProject.css'
import React from "react";
import Title from "../Title/Title";
import TimeLine from "../TimeLine/TimeLine";

export default function AboutProject() {
  return (
    <section className="about-project">
      <Title titleName="О проекте"/>
      <div className="about-project__container">
        <div>
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__article">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__article">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <TimeLine/>
    </section>
  )
}