import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../comonents/Navbar'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function CategoryCars() {
  const params = useParams()

  const [cars, setCars] = useState(null)
  const [car, setCar] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/category/${params.categoryName}`) 
    .then((response) => {
      console.log(response.data)
      setCars(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  if (cars === null) {
    return <h3>Buscando</h3>
  }
  
  return (
    <div>
      <Navbar/>
        {cars.map((car) => (
          <div key={car._id}>
            <Link to={`/car/${car._id}`}>
              <img src={car.imageUrl} alt="imagen" />
              <h1>{car.name}</h1>
              <h1>{car.model}</h1>
              <h1>{car.price}€</h1>  
            </Link>
          </div>
        ))}
    </div>
  )
}

export default CategoryCars