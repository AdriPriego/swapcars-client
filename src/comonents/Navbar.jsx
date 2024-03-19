import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from "react-router-dom";

//Estilos



function Navbar() {

  const { isLoggedIn, user } = useContext(AuthContext)

  return (
    <nav>
      <Link to={"/"}>
        <img id='logo' src={Logo} alt="" />
      </Link>

      {isLoggedIn && (
        <div>
          <p>Hola:{user.name}</p>
          <Link to={"/create-car"}>
            Subir Coche
            Favoritos
          </Link>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to={"/signup"}>Registrase</Link>
          <Link to={"/login"}>Iniciar Session</Link>
        </div>
      )}

        <button>☰</button>
    </nav>
  )
}

export default Navbar