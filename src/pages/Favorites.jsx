import React, { useEffect, useState } from 'react'
import Navegacion from '../comonents/Navegacion'
import service from '../services/config.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Favorites() {
  const navigate = useNavigate()
  const [favoriteCars, setFavoriteCars] = useState([])
  const { isLoggedIn, user, userName } = useContext(AuthContext)

  useEffect(() => {
    service.get(`/cars/${user}/favorite`)
      .then((response) => {
        setFavoriteCars(response.data)
      })
      .catch((error) => {
        navigate("/error")
      })
  }, [])

  return (
    <div>
      <Navegacion />
      <h1 id='titulo-favoritos'>Tus Favoritos:</h1>
      {favoriteCars.map((car) => (
        <div className='favoritos' key={car._id}>
          <Link to={`/car/${car._id}`} className='text-decoration-none'>
            <img src={car.imageUrl} alt="imagen" width={"300px"} />
            <div id='name-favorites'>
              <h1>{car.name}</h1>
              <h3>{car.km}</h3>
              <h3>{car.price}€</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Favorites