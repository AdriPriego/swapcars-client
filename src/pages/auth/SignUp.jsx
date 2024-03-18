import { useState } from 'react'
import Logo from "../../assets/logo.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
        <img src={Logo} alt="logo" />
        <h1>Registrate</h1>

        <form onSubmit={handleSignup}>
            <label>Nombre</label>
            <input value={name} type="text" name='name'onChange={handleName} />

            <label>Email</label>
            <input value={email} type="email" name='email' onChange={handleEmail}/>

            <label>Ubicación</label>
            <input value={location} type="text" name='location'onChange={handleLocation} />

            <label>Contraseña</label>
            <input value={password} type="password" name='password' onChange={handlePassword}/>

            <p>{errorMessage}</p>

            <button>Confirmar</button>
        </form>
    </div>
  )
}

export default SignUp