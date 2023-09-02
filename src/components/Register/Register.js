import React from "react";
import PopupSign from '../PopupSign/PopupSign'

export default function Register(props) {
  return (
    <main>
      <PopupSign toRegister={true} title='Добро пожаловать!' buttonText='Зарегистрироваться' textRedirect='Уже зарегистрированы?' textLink='Войти' toRegisterApi={props.toRegisterApi}/>
    </main>
  )
}