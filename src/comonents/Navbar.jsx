import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../context/auth.context'

function Navbar() {

  const {isLoggedIn, user} = useContext(AuthContext)

  return (
    <nav>
      <Link to={"/"}>
        <img id='logo' src={Logo} alt="" />
      </Link>

      {isLoggedIn && (
        <Link to={"/create-car"}>
          Subir Coche
        </Link>
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