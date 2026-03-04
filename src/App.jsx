import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import Nav from './components/Nav/Nav'
import Rutine from './components/Rutine/Rutine'

function App() {

  return (
    <>
      <BrowserRouter>
        <Home />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/seccion/Rutina' element={<Rutine/>} />
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App
