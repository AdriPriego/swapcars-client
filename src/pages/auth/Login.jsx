import React, { useContext } from 'react'
import { useState } from 'react'
import Logo from "../../assets/logo.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { Link } from 'react-router-dom'

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
            console.log(response.data.authToken)

            storeToken(response.data.authToken)

            authenticateUser()
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
        <img src={Logo} alt="Logo" />
        <h1>Inicar Session</h1>

        <form onSubmit={handleLogin}>
            <label>Email</label>
            <input value={email} type="email" onChange={handleEmail}/>

            <label>Contraseña</label>
            <input value={password} type="password" onChange={handlePassword}/>

            <p>{errorMessage}</p>

            <button>Entrar</button>
        </form>

        <h3>Todavia no tienes cuenta?</h3>
        <Link to={"/signup"}>Registrarse</Link>

    </div>
  )
}

export default Login