import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const API_URL = import.meta.env.VITE_API_URL


function CarEdit() {

    const params = useParams()
    
    const [name, setName] = useState("")
    const [model, setModel] = useState("")
    const [category, setCategory] = useState("")
    const [year, setYear] = useState(0)
    const [cv, setCv] = useState(0)
    const [km, setKm] = useState(0)
    const [price, setPrice] = useState(0)

    const handleName = (event) => {
        let inputName = event.target.value
        setName(inputName)
    }

    const handleYear = (event) => {
        let inputYear = event.target.value
        setYear(inputYear)
    }

    const handleCv = (event) => {
        let inputCv = event.target.value
        setCv(inputCv)
    }

    const handleKm = (event) => {
        let inputKm = event.target.value
        setKm(inputKm)
    }

    const handlePrice = (event) => {
        let inputPrice = event.target.value
        setPrice(inputPrice)
    }

    const handleCategory = (event) => {
        let inputCategory = event.target.value
        setCategory(inputCategory)
    }

    const handleModel = (event) => {
        let inputModel = event.target.value
        setModel(inputModel)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const newCar = {
            name: name,
            model: model,
            category: category,
            year: year,
            cv: cv,
            km: km,
            price: price
        }

        axios.put(`${API_URL}/api/cars/${carId}`, newCar)
        .then((response) => {
            console.log(response.data)

            navigate("/")
        })
        .catch((error) => {
            console.log(error)
        })

    }

  return (
    <div>
        <form>
            <h1>Editar Anunció</h1>

            <label>Nombre:</label>
            <input type="text" />
        </form>
    </div>
  )
}

export default CarEdit