import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../comonents/Navbar"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function CarDetail() {
  const navigate = useNavigate()
  const { isLoggedIn, user } = useContext(AuthContext)

  //const userCretor = userCar === user._id


  const params = useParams()
  const [car, setCar] = useState(null)
  const [sendQuestion, setSendQuestion] = useState("")
  const [questions, setQuestion] = useState([])
  const [creator, setCreator] = useState("")

  const handleQuestion = (event) => {
    let inputQuestion = event.target.value
    setSendQuestion(inputQuestion)
  }

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/${params.carId}`)
      .then((response) => {
        setCar(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get(`${API_URL}/api/question/${params.carId}`)
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
    axios.delete(`${API_URL}/api/cars/${params.carId}`)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submitQuestion = () => {

    const newQuestion = {
      question: sendQuestion
    }

    axios.post(`${API_URL}/api/question/${params.carId}/${user._id}`, newQuestion)
      .then((response) => {
        console.log(response.data)
        setSendQuestion("")
        axios.get(`${API_URL}/api/cars/${params.carId}`)
          .then((response) => {
            setCar(response.data)
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })

        axios.get(`${API_URL}/api/question/${params.carId}`)
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
    axios.delete(`${API_URL}/api/question?question=${questions}`)
      .then(() => {
        console.log("eliminado")
        axios.get(`${API_URL}/api/question/${params.carId}`)
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

  return (
    <div>
      <NavBar />
      <p>Publicado por:  </p>
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
  )
}

export default CarDetail