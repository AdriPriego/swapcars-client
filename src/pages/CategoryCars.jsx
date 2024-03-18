import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function CategoryCars() {
  const [cars, setCars] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/${cars.params.id}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  })
  
  return (
    <div>
        
    </div>
  )
}

export default CategoryCars