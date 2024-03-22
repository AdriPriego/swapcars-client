import React, { useContext } from 'react'
import { useState } from 'react'
import Logo from "../../assets/logo.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const API_URL = import.meta.env.VITE_API_URL

function Login(props) {
    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLogin = async (e) => {
        e.preventDefault()

        const credentials = {
            email,
            password
        }

        try {

            const response = await axios.post(`${API_URL}/api/auth/login`, credentials)

            storeToken(response.data.authToken)

            await authenticateUser()

            navigate("/")

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
            <img src={Logo} alt="Logo" width={"300px"} />
            <h1>Inicar Session</h1>

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={handleEmail} type="email" placeholder="Enter email" />
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

            <h3>Todavia no tienes cuenta?</h3>
            <Link to={"/signup"}>Registrarse</Link>

        </div>
    )
}

export default Login