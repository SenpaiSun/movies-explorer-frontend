import PopupSign from '../PopupSign/PopupSign'
import './Login.css'

export default function Login(props) {
  return (
    <PopupSign title={props.title} buttonText={props.buttonText} textRedirect={props.textRedirect} textLink={props.textLink}/>
  )
}