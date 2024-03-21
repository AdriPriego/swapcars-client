import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navegacion from '../comonents/Navegacion'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import service from '../services/config.services'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function CarDetail() {
  const navigate = useNavigate()
  const { isLoggedIn, user, userName } = useContext(AuthContext)

  const params = useParams()
  const [car, setCar] = useState(null)
  const [sendQuestion, setSendQuestion] = useState("")
  const [questions, setQuestion] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

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
        navigate("/error")
      })

    service.get(`/question/${params.carId}`)
      .then((response) => {
        console.log(response.data)
        setQuestion(response.data)
      })
      .catch((error) => {
        console.log(error)
        navigate("/error")
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
        navigate("/error")
      })
  }

  const submitQuestion = () => {

    const newQuestion = {
      question: sendQuestion,
      user: user,
      userName: userName
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
            navigate("/error")
          })

        service.get(`/question/${params.carId}`)
          .then((response) => {
            console.log(response.data)
            setQuestion(response.data)
          })
          .catch((error) => {
            console.log(error)
            navigate("/error")
          })
      })
      .catch((error) => {
        console.log(error)
        navigate("/error")
      })
  }

  const deleteQuestion = (questionId) => {
    service.delete(`/question/${questionId}`)
      .then(() => {
        console.log("eliminado")
        service.get(`/question/${params.carId}`)
          .then((response) => {
            console.log(response.data)
            setQuestion(response.data)
          })
          .catch((error) => {
            console.log(error)
            navigate("/error")
          })
      })
      .catch((error) => {
        console.log(error)
        navigate("/error")
      })
  }

  if (user === car.userCar) {
    return <div>
      <Navegacion />
      <div className='detalles'>
        <img src={car.imageUrl} alt="imagen" width={"300px"} />
        <h1>{car.name}</h1>
        <h1 id='precio'>{car.price}€</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{car.year}</td>
              <td>{car.km} km</td>
              <td>{car.location}</td>
              <td>{car.category}</td>
              <td>{car.cv} cv</td>
              <td>{car.model}</td>
            </tr>
          </tbody>
        </Table>
        <h4 id='descrpcion-detalles-titulo'>Descripción del anunciante</h4>
        <h3 id='descrpcion-detalles'>{car.description}</h3>
      </div>

      {isLoggedIn && (
        <div>
          <h3>Preguntas:</h3>
          <div>
            {questions.map((eachQuestion) => (
              <div key={eachQuestion._id}>
                <p>Pregunta de {eachQuestion.userName}</p>
                <h4>{eachQuestion.question}</h4>
                {user === eachQuestion.user && (
                  <div>
                    <Button variant='outline-danger' onClick={() => deleteQuestion(eachQuestion._id)}>eliminar</Button>
                    <Link to={`/edit-question/${eachQuestion._id}`}>
                      <Button variant='outline-warning'>Editar</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <input type="text" value={sendQuestion} onChange={handleQuestion} placeholder='Escribe tu pregunta' />
          <Button variant='outline-success' onClick={submitQuestion}>Crear</Button>
          <br />
          <br />
          <Button variant='outline-danger' onClick={handleDelete}>Eliminar</Button>
          <Link to={`/edit-car/${params.carId}`}>
            <Button variant='outline-secondary'>Editar</Button>
          </Link>
        </div>
      )}
    </div>
  }

  return (
    <div>
      <Navegacion />
      <div className='detalles'>
        <img src={car.imageUrl} alt="imagen" width={"300px"} />
        <h1>{car.name}</h1>
        <h1 id='precio'>{car.price}€</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{car.year}</td>
              <td>{car.km} km</td>
              <td>{car.location}</td>
              <td>{car.category}</td>
              <td>{car.cv} cv</td>
              <td>{car.model}</td>
            </tr>
          </tbody>
        </Table>
        <h4 id='descrpcion-detalles-titulo'>Descripción del anunciante</h4>
        <h3 id='descrpcion-detalles'>{car.description}</h3>
      </div>
      {isLoggedIn && (
        <div>
          <h3>Preguntas:</h3>
          <div>
            {questions.map((eachQuestion) => (
              <div key={eachQuestion._id}>
                <p>Pregunta de {eachQuestion.userName}</p>
                <h4>{eachQuestion.question}</h4>
                {user === eachQuestion.user && (
                  <div>
                    <Button variant='outline-danger' onClick={deleteQuestion}>eliminar</Button>
                    <Link to={`/edit-question/${eachQuestion._id}`}>
                      <Button variant='outline-warning'>Editar</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <input type="text" value={sendQuestion} onChange={handleQuestion} placeholder='Escribe tu pregunta' />
          <Button variant='outline-success' onClick={submitQuestion}>Crear</Button>
          <button>Favorito</button>
        </div>
      )}
    </div>
  )
}

export default CarDetail