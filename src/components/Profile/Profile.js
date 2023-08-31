import React from "react";
import Header from "../Header/Header";
import PopupEdit from '../PopupEdit/PopupEdit'
import Preloader from '../Preloader/Preloader'

export default function Profiler(props) {
  return (
    props.userData ? (
      <>
      <Header main={true} profile={props.profile}/>
      <main>
        <PopupEdit userData={props.userData}/>
      </main>
    </>
    ) : <Preloader/>
  )
}