import React from "react";

export default function TimeLine() {
  return (
    <section className="timeline">
      <div className="timeline__backend">
        <p className="timeline__one-week">1 неделя</p>
        <p className="timeline__text-direction">Back-end</p>
      </div>
      <div className="timeline__frontend">
        <p className="timeline__four-week">4 недели</p>
        <p className="timeline__text-direction">Front-end</p>
      </div>
    </section>
  )
}