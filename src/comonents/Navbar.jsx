import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from "react-router-dom";
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const [buscar, setBuscar] = useState("")
  const [resultadoBuscar, setResultadoBuscar] = useState([])

  const handleBuscar = (event) => {
    let inputBuscar = event.target.value
    setBuscar(inputBuscar)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    axios.get(`${API_URL}/api/search?query=${buscar}`)
    .then((response) => {
      console.log(response.data)
      setResultadoBuscar(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <nav>
      <Link to={"/"}>
        <img id='logo' src={Logo} alt="" />
      </Link>

      {isLoggedIn && (
        <div className='div-todo'>
          <input id='buscador' type="text" placeholder='Buscar' value={buscar} onChange={handleBuscar}/>
          <button id='boton-buscador' onClick={handleSearch}>buscar</button>
          <div>
            <ul>
              {resultadoBuscar.map(car => (
                <div key={car._id}>
                  <li>
                    <Link to={`/car/${car._id}`}>
                      <img src={car.imageUrl} alt="imagen" />
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <button id='logout' onClick={logOutUser}>Salir</button>
          <div>
            <Link to={"/create-car"}>
              Subir Coche
            </Link>
              Favoritos
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to={"/signup"}>Registrase</Link>
          <Link to={"/login"}>Iniciar Session</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar