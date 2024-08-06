
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Centro from './pages/centro/Centro'
import Galeria from './pages/galeria/Galeria'
import Veterinarios from './pages/veterinarios/Veterinarios'

function App() {


  return (
    <Routes>
 <Route path='/' element={<Home />} />
 <Route path='centro' element={<Centro />} />
 <Route path='galeria' element={<Galeria />} />
 <Route path='veterinarios' element={<Veterinarios />} />


    </Routes>
     
  )
}

export default App
