import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

//Paginas
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Home from "./pages/Home"



function App() {

  return (
    <div>
      <Routes>

        <Route path='/' element={<Home />} />
        
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />


      </Routes>
    </div>
  )
}

export default App
