import './Title.css'
import React from "react";

export default function Title(props) {
  return (
    <section className={`title ${props.marginSelector}`}>
      <h2 className={`title__text ${props.titleMargin}`}>{props.titleName}</h2>
    </section>
  )
}