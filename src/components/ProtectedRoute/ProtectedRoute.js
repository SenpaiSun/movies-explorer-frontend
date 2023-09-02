import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRouteElement = ({component: Component, ...props}) => {
  console.log("протектерроутэлемент")
  return (
    props.isLogged ? <Component {...props}/> : <Navigate to='/signup' replace/>
  )
}

export default ProtectedRouteElement