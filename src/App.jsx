
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Centro from './pages/centro/Centro'
import Galeria from './pages/galeria/Galeria'

function App() {


  return (
    <Routes>
 <Route path='/' element={<Home />} />
 <Route path='centro' element={<Centro />} />
 <Route path='galeria' element={<Galeria />} />


    </Routes>
     
  )
}

export default App
