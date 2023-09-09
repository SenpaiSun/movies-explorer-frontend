import PopupSign from '../PopupSign/PopupSign'

export default function Login(props) {
  return (
    <main>
      <PopupSign title='Рады видеть!' buttonText='Войти' textRedirect='Ещё не зарегистрированы?' textLink='Регистрация' toLoginApi={props.toLoginApi}/>
    </main>
  )
}