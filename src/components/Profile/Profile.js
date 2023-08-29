import React from "react";
import Header from "../Header/Header";
import PopupEdit from '../PopupEdit/PopupEdit'

export default function Profiler(props) {
  return (
    <>
      <Header main={true} profile={props.profile}/>
      <main>
        <PopupEdit/>
      </main>
    </>
  )
}