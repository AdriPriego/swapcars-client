import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL

function CarCreate() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [model, setModel] = useState("")
    const [category, setCategory] = useState("")
    const [year, setYear] = useState(0)
    const [cv, setCv] = useState(0)
    const [km, setKm] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

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

    const handleImage = (event) => {
        let inputImage = event.target.value
        setImage(inputImage)
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

        axios.post(`${API_URL}/api/cars`, newCar)
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
        <form onSubmit={handleSubmit}>
            <h1>Publicar Coche</h1>
            
            <label>Nombre:</label>
            <input type="text" onChange={handleName} />

            <label>Modelo:</label>
            <select value={model} onChange={handleModel}>
                <option value="">--Selecciona el Modelo--</option>
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                <option value="Seat">Seat</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Renault">Renault</option>
                <option value="Tesla">Tesla</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Ferrari">Ferrari</option>
            </select>

            <label>Categoria:</label>
            <select value={category} onChange={handleCategory}>
                <option value="">--Categoria--</option>
                <option value="Suv">Suv</option>
                <option value="Cabrio">Cabrio</option>
                <option value="4x4">4x4</option>
            </select>

            <label>Año:</label>
            <input type="Number" value={year} onChange={handleYear} />

            <label>CV:</label>
            <input type="Number" value={cv} onChange={handleCv} />

            <label>KM:</label>
            <input type="Number" value={km} onChange={handleKm} />

            <label>Precio:</label>
            <input type="Number" value={price} onChange={handlePrice} />

            <h3>Seleccionar imagen</h3>
            <input type="file" value={image} onChange={handleImage} accept='image/*'/>

            <button type='submit'>Publicar</button>

        </form>
    </div>
  )
}

export default CarCreate