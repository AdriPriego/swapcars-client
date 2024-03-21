import { useState } from 'react'
import Logo from "../../assets/logo.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const API_URL = import.meta.env.VITE_API_URL

function SignUp() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleLocation = (e) => setLocation(e.target.value)

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log(name, email, location, password)

        const newUser = {
            name,
            email,
            location,
            password
        }
        
        try {
            
            await axios.post(`${API_URL}/api/auth/signup`, newUser)

            navigate("/login")

        } catch (error) {
            let errorCode = error.response.status
            let errorMessage = error.response.data.message
            if (errorCode === 400) {
                setErrorMessage(errorMessage)
            } else {
                console.log(error)
            }
        }
    }

  return (
    <div>
        <img src={Logo} alt="logo" width={"300px"}/>
        <h1>Registrate</h1>

        <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={name} onChange={handleName} type="text" placeholder="Nombre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={handleEmail} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLocation">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control value={location} onChange={handleLocation} type="text" placeholder="Ubicación" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control value={password} onChange={handlePassword} type="password" placeholder="Password" />
                </Form.Group>

                <p>{errorMessage}</p>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    </div>
  )
}

export default SignUp