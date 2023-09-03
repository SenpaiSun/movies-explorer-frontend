import React, { useContext} from "react";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({component: Component, ...props}) => {

  return (
    props.isLogged ? <Component {...props}/> : <Navigate to='/'/>
  )
}

export default ProtectedRoute