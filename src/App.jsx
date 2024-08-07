
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Centro from './pages/centro/Centro'
import Galeria from './pages/galeria/Galeria'
import Veterinarios from './pages/veterinarios/Veterinarios'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

function App() {


  return (
    <Routes>
 <Route path='/' element={<Home />} />
 <Route path='centro' element={<Centro />} />
 <Route path='galeria' element={<Galeria />} />
 <Route path='veterinarios' element={<Veterinarios />} />
 <Route path='register' element={<Register />} />
 <Route path='login' element={<Login />} />
 <Route path='profile' element={<Profile />} />


    </Routes>
     
  )
}

export default App
