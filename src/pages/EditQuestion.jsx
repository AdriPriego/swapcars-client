import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navegacion from '../comonents/Navegacion'
import service from '../services/config.services'


function EditQuestion() {
    const params = useParams()
    const navigate = useNavigate()

    const [question, setQuestion] = useState("")

    const handleQuestion = (event) => {
        let inputQuestion = event.target.value
        setQuestion(inputQuestion)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newQuestion = {
            question: question
        }

        service.put(`question/${params.questionId}`, newQuestion)
            .then((response) => {

                navigate(`/`)
            })
            .catch((error) => {
                navigate("/error")
            })
    }

    return (
        <div>
            <Navegacion />

            <form onSubmit={handleSubmit}>

                <h1>Editar Pregunta:</h1>

                <label>Pregunta:</label>
                <input type="text" value={question} onChange={handleQuestion} />

                <button type='submit'>Confirmar</button>

            </form>

        </div>
    )
}

export default EditQuestion