import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <img id='logo' src={Logo} alt="" />

      
      <Link to={"/signup"}>Registrase</Link>
      <Link to={"/login"}>Iniciar Session</Link>

      <img src="" alt="user" />
    </nav>
  )
}

export default Navbar