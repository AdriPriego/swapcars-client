import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function CarDetail() {
  const {carId} = useParams()
  const [car, setCar] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/${carId}`)
    .then((response) => {
      setCar(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    }, [carId])
  })

  if (!car) {
    return <h2>Buscando</h2>
  }

  return (
    <div>
        <h1>{car.name}</h1>
        <h2>{car.model}</h2>
    </div>
  )
}

export default CarDetail