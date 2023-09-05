import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {

  return (
    localStorage.getItem('token') ? <Component {...props}/> : <Navigate to='/'/>
  )
}

export default ProtectedRoute