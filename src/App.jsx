import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import Nav from './components/Nav/Nav'
import Rutine from './components/Rutine/Rutine'
import Progress from './components/Progress/Progress'
import Objetives from './components/Objetives/Objetives'
import Profile from './components/Profile/Profile'
import Us from './components/Us/Us'

function App() {

  return (
    <>
      <BrowserRouter>
        <Home />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/seccion/Rutina' element={<Rutine/>} />
          <Route path='/seccion/Objetivos' element={<Objetives/>} />
          <Route path='/seccion/Progresos' element={<Progress/>} />
          <Route path='/seccion/Perfil' element={<Profile/>} />
          <Route path='/seccion/Us' element={<Us/>} />
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App
