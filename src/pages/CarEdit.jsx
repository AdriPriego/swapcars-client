import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import service from '../services/config.services'
import Navegacion from '../comonents/Navegacion'
import services from "../services/file-upload.service"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CarEdit() {
    const navigate = useNavigate()

    const params = useParams()

    const [name, setName] = useState("")
    const [model, setModel] = useState("")
    const [category, setCategory] = useState("")
    const [year, setYear] = useState(0)
    const [cv, setCv] = useState(0)
    const [km, setKm] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const dataCarDetails = async () => {

            try {

                const response = await service.get(`/cars/${params.carId}`)
                const carData = response.data
                setName(carData.name)
                setModel(carData.model)
                setCategory(carData.category)
                setYear(carData.year)
                setCv(carData.cv)
                setKm(carData.km)
                setPrice(carData.price)
                setImageUrl(carData.imageUrl)
                setDescription(carData.description)

            } catch (error) {
                navigate("/error")
            }
        }
        dataCarDetails()
    }, [])

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

    const handleFileUpload = (e) => {
        const uploadData = new FormData()

        uploadData.append("imageUrl", e.target.files[0])

        services
            .uploadImage(uploadData)
            .then(response => {
                setImageUrl(response.fileUrl)
            })
            .catch(error => console.log("error al subir file", error))
    }

    const handleDescription = (event) => {
        let inputDescription = event.target.value
        setDescription(inputDescription)
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
            price: price,
            imageUrl: imageUrl,
            description: description
        }

        service.put(`/cars/${params.carId}`, newCar)
            .then((response) => {

                navigate("/")
            })
            .catch((error) => {
                navigate("/error")
            })

    }

    return (
        <div>
            <Navegacion />

            <Form onSubmit={handleSubmit}>
                <h1>Editar Coche</h1>
                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" onChange={handleName} value={name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAño">
                    <Form.Label>Año:</Form.Label>
                    <Form.Control type="Number" placeholder="Año" value={year} onChange={handleYear} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCv">
                    <Form.Label>CV:</Form.Label>
                    <Form.Control type="Number" placeholder="CV" value={cv} onChange={handleCv} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicKm">
                    <Form.Label>KM:</Form.Label>
                    <Form.Control type="Number" placeholder="Km" value={km} onChange={handleKm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control type="Number" placeholder="Precio" value={price} onChange={handlePrice} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control type="text" placeholder="Descripción" value={description} onChange={handleDescription} />
                </Form.Group>

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
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Bmw">Bmw</option>
                    <option value="Audi">Audi</option>
                    <option value="Skoda">Skoda</option>
                </select>


                <label>Categoria:</label>
                <select value={category} onChange={handleCategory}>
                    <option value="">--Categoria--</option>
                    <option value="Suv">Suv</option>
                    <option value="Cabrio">Cabrio</option>
                    <option value="4x4">4x4</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Berlina">Berlina</option>
                    <option value="Pick-Up">Pick Up</option>
                </select>


                <h3>Seleccionar imagen</h3>
                <input type="file" onChange={handleFileUpload} />

                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CarEdit