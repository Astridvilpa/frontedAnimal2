
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Centro from './pages/centro/Centro'

function App() {


  return (
    <Routes>
 <Route path='/' element={<Home />} />
 <Route path='centro' element={<Centro />} />


    </Routes>
     
  )
}

export default App
