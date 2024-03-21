import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from "../comonents/Navbar"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import service from '../services/config.services'

function CarDetail() {
  const navigate = useNavigate()
  const { isLoggedIn, user, userName } = useContext(AuthContext)

  const params = useParams()
  const [car, setCar] = useState(null)
  const [sendQuestion, setSendQuestion] = useState("")
  const [questions, setQuestion] = useState([])

  const handleQuestion = (event) => {
    let inputQuestion = event.target.value
    setSendQuestion(inputQuestion)
  }

  useEffect(() => {
    service.get(`/cars/${params.carId}`)
      .then((response) => {
        setCar(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    service.get(`/question/${params.carId}`)
      .then((response) => {
        console.log(response.data)
        setQuestion(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (!car) {
    return <h2>Buscando</h2>
  }

  const handleDelete = () => {
    service.delete(`/cars/${params.carId}`)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submitQuestion = () => {

    const newQuestion = {
      question: sendQuestion,
      user: user
    }

    service.post(`question/${params.carId}`, newQuestion)
      .then((response) => {
        console.log(response.data)
        setSendQuestion("")
        service.get(`/cars/${params.carId}`)
          .then((response) => {
            setCar(response.data)
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })

        service.get(`/question/${params.carId}`)
          .then((response) => {
            console.log(response.data)
            setQuestion(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteQuestion = () => {
    service.delete(`/${questionId}`)
      .then(() => {
        console.log("eliminado")
        service.get(`/question/${params.carId}`)
          .then((response) => {
            console.log(response.data)
            setQuestion(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (user === car.userCar) {
    return <div>
      <NavBar />
      <img src={car.imageUrl} alt="imagen" />
      <h1>{car.name}</h1>
      <h1>{car.price}€</h1>
      <h2>Modelo: {car.model}</h2>
      <h2>Año: {car.year}</h2>
      <h2>{car.km} km</h2>
      <h2>{car.cv} cv</h2>


      {isLoggedIn && (
        <div>
          <h3>Preguntas:</h3>
          <div>
            {questions.map((eachQuestion) => (
              <div key={eachQuestion._id}>
                <h4>{eachQuestion.question}<button onClick={deleteQuestion}>eliminar</button></h4>
                <Link to={`/edit-question/${eachQuestion._id}`}>
                  <button>Editar</button>
                </Link>
              </div>
            ))}
          </div>

          <input type="text" value={sendQuestion} onChange={handleQuestion} placeholder='Escribe tu pregunta' />
          <button onClick={submitQuestion}>Crear una pregunta</button>
          <br />
          <br />
          <button onClick={handleDelete}>Eliminar</button>
          <Link to={`/edit-car/${params.carId}`}>Editar</Link>
        </div>
      )}
    </div>
  }

  if (eachQuestion._id === user) {
                  
  }

  return (
    <div>
      <NavBar />
      <img src={car.imageUrl} alt="imagen" />
      <h1>{car.name}</h1>
      <h1>{car.price}€</h1>
      <h2>Modelo: {car.model}</h2>
      <h2>Año: {car.year}</h2>
      <h2>{car.km} km</h2>
      <h2>{car.cv} cv</h2>


      {isLoggedIn && (
        <div>
          <h3>Preguntas:</h3>
          <div>
            {questions.map((eachQuestion) => (
              <div key={eachQuestion._id}>
                <h4>{eachQuestion.question}<button onClick={deleteQuestion}>eliminar</button></h4>
                <Link to={`/edit-question/${eachQuestion._id}`}>
                  <button>Editar</button>
                </Link>
              </div>
            ))}
          </div>

          <input type="text" value={sendQuestion} onChange={handleQuestion} placeholder='Escribe tu pregunta' />
          <button onClick={submitQuestion}>Crear una pregunta</button>
          <br />
          <br />
        </div>
      )}
    </div>
  )
}

export default CarDetail