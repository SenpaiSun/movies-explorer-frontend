import PopupSign from '../PopupSign/PopupSign'

export default function Login(props) {
  return (
    <main>
      <PopupSign title={props.title} buttonText={props.buttonText} textRedirect={props.textRedirect} textLink={props.textLink}/>
    </main>
  )
}