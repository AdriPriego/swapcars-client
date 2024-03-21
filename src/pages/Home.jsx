import React, { useState } from 'react'

import { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Suv from "../assets/suvss.png"
import SuvCarousel from "../assets/suvs-tarjet.jpeg"
import cuatro from "../assets/4x4.png"
import Cabrio from "../assets/cabrio.png"
import CardBody from 'react-bootstrap/CardBody'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import service from '../services/config.services'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Navegacion from '../comonents/Navegacion'
import Cabrioo from "../assets/cabrioo.jpg"
import suvDos from "../assets/suv.jpeg"
import todoTerreno from "../assets/mucha.jpeg"


function Home() {
  const navigate = useNavigate()

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
        navigate("/error")
      })
  }, [])

  return (
    <div>
      <Navegacion />
      <Carousel className='carousel' data-bs-theme="dark">
        <Carousel.Item>
          <Link to={"/category/Suv"}>
            <img
              className="d-block w-100"
              src={suvDos}
              alt="First slide"
            />
          </Link>
          <Carousel.Caption>
            <h5>Suv</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={"/category/Cabrio"}>
            <img
              className="d-block w-100"
              src={Cabrioo}
              alt="Second slide"
            />
          </Link>
          <Carousel.Caption>
            <h5>Cabrio</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={"/category/4x4"}>
            <img
              className="d-block w-100"
              src={todoTerreno}
              alt="Third slide"
            />
          </Link>
          <Carousel.Caption>
            <h5>4x4</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className='coches'>
        {cars.slice(0, 9).map((car) => (
          <div key={car._id}>
            <Link to={`/car/${car._id}`} className='text-decoration-none'>
              <CardGroup className='todos-coches'>
                <Card>
                  <Card.Img variant="top" src={car.imageUrl} width={"200px"}/>
                  <Card.Body className='texto-coches'>
                    <Card.Title><h2>{car.name}</h2></Card.Title>
                    <h4>{car.model}</h4>
                    <h4>{car.km}km</h4>
                    <h4>{car.price}€</h4>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Link>
          </div>
        ))}
      </div>
      <h1 id='titulo-categoria'>Categorias</h1>

      <div className='todas-categorias'>
        <CardGroup className='categories'>
          <Link to={"/category/Suv"} className='text-decoration-none'>
            <CardGroup className='categoria'>
              <Card>
                <Card.Img variant="top" src={Suv} />
                <Card.Body className='texto-coches'>
                  <Card.Title><h2>Suv</h2></Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
          </Link>

          <Link to={"/category/Cabrio"} className='text-decoration-none'>
            <CardGroup className='categoria'>
              <Card>
                <Card.Img id='imagen-4x4' variant="top" src={Cabrio} />
                <Card.Body className='texto-coches'>
                  <Card.Title><h2>4x4</h2></Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
          </Link>

          <Link to={"/category/4x4"} className='text-decoration-none'>
            <CardGroup className='categoria'>
              <Card>
                <Card.Img variant="top" src={cuatro} />
                <Card.Body className='texto-coches'>
                  <Card.Title><h2>Cabrio</h2></Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
          </Link>
        </CardGroup>
      </div>
    </div>
  )
}

export default Home