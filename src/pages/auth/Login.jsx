import React from 'react'
import { useState } from 'react'
import Logo from "../../assets/logo.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

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
            
            const response = await axios.post("http://localhost:5005/api/auth/login", credentials)
            console.log(response)

            localStorage.setItem("authToken", response.data.authToken)

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

    </div>
  )
}

export default Login