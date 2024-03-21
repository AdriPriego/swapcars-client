import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div>
        <h2>A ocurrido un error intentalo mas tarde </h2>
        <Link to={"/"}>Volever</Link>
    </div>
  )
}

export default Error