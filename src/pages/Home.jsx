import React, { useState } from 'react'
import Navbar from '../comonents/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Suv from "../assets/suvs-tarjet.jpeg"
import cuatro from "../assets/4x4-tarjet.jpeg"
import Cabrio from "../assets/cabrio-tarjet.jpg"
import CardBody from 'react-bootstrap/CardBody'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import service from '../services/config.services'

function Home() {
  const [cars, setCars] = useState([])
  const { isLoggedIn, user, userName } = useContext(AuthContext)
  useEffect(() => {
    service.get(`/cars`)
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
      <p>Hola: {userName}</p>
      <div className='coches'>
        {cars.slice(0, 9).map((car) => (
          <div className='coches2' key={car._id}>
            <Link to={`/car/${car._id}`}>
              <img src={car.imageUrl} alt="imagen coche" />
              <h1>{car.price}€</h1>
              <h1>{car.name}</h1>
              <h2>{car.model}</h2>
              <h2>Año:{car.year}</h2>
              <h2>{car.cv}cv</h2>
            </Link>
          </div>
        ))}
      </div>
      <h1 id='titulo-categoria'>Categorias</h1>
      <CardGroup className='categories'>
        <Link to={"/category/Suv"}>
          <Card>
            <Card.Img id='foto-categoria' variant="top" src={Suv}/>
            <Card.Body>
              <Card.Title id='titulo-categorias'>Suvs</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to={"/category/Cabrio"}>
          <Card>
            <Card.Img id='foto-categoria' variant="top" src={cuatro}/>
            <Card.Body>
              <Card.Title id='titulo-categorias'>4x4</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to={"/category/4x4"}>
          <Card>
            <Card.Img id='foto-categoria' variant="top" src={Cabrio}/>
            <Card.Body>
              <Card.Title id='titulo-categorias'>Cabrio</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardGroup>
    </div>
  )
}

export default Home