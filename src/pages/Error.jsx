import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='server-error'>
        <h2>Internal Server Error</h2>
        <p id='descripcion-server'>Please try again later</p>
        <Link to={"/"}>volver</Link>
    </div>
  )
}

export default Error