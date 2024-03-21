import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navegacion from '../comonents/Navegacion'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
      <Navegacion />
      {cars.map((car) => (
        <div key={car._id}>
          <Link to={`/car/${car._id}`}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={car.imageUrl} />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <h1>{car.model}</h1>
                <h1>{car.price}€</h1>
                <Button variant="primary">Ver Mas</Button>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryCars