import React, { useState } from 'react'
import Navbar from '../comonents/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/cars`)
      .then((response) => {
        console.log(response.data)
        setCars(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <div>
      <Navbar />
      <div>
        {cars.slice(0, 6).map((car) => (
          <div key={car._id}>
            <Link to={`/car/${car._id}`}>
              <img src={car.image} alt="imagen coche" />
              <h1>{car.name}</h1>
              <h2>{car.model}</h2>
              <h2>Año:{car.year}</h2>
              <h2>{car.cv}cv</h2>
            </Link>
          </div>
        ))}
      </div>
      <h1>Categorias</h1>
    </div>
  )
}

export default Home