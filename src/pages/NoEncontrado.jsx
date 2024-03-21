import React from 'react'
import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <div>
        <h1>No se a encontrado la pagina</h1>
        <Link to={"/"}>Volver</Link>
    </div>
  )
}

export default NoEncontrado