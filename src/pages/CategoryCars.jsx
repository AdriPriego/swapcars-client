import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function CategoryCars() {
  const params = useParams()

  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/cars?category=${params.category}`)
    .then((response) => {
      console.log(response.data)
      setCars(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [params.category])
  
  return (
    <div>
        {cars.map((car) => (
          <div key={car._id}>
            <h1>{car.name}</h1>  
          </div>
        ))}
    </div>
  )
}

export default CategoryCars