import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import IsPrivate from "./comonents/IsPrivate"
import IsAnon from "./comonents/IsAnon"

//Paginas
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Home from "./pages/Home"
import CarDetail from "./pages/CarDetail"
import CategoryCars from "./pages/CategoryCars"
import CarCreate from './pages/CarCreate'
import CarEdit from './pages/CarEdit'
import EditQuestion from './pages/EditQuestion'




function App() {

  return (
    <div>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/car/:carId' element={<CarDetail />} />
        <Route path='/category/:categoryName' element={<IsPrivate> <CategoryCars /> </IsPrivate>} />
        <Route path='/create-car' element={<IsPrivate> <CarCreate /> </IsPrivate>} />
        <Route path='/edit-car/:carId' element={<IsPrivate> <CarEdit /> </IsPrivate>} />
        <Route path='/edit-question/:questionId' element={<IsPrivate> <EditQuestion /> </IsPrivate>} />

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />


      </Routes>
    </div>
  )
}

export default App
