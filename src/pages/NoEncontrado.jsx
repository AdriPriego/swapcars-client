import React from 'react'
import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <div className='no-encontrado'>
        <h1>Esta Página no está disponible</h1>
        <p id='descripcion-noencontrado'>la dirección web que ha introducido no se encuentra disponible</p>
        <Link to={"/"}>volver</Link>
    </div>
  )
}

export default NoEncontrado