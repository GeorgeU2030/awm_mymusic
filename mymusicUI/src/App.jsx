import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Menu from './pages/Menu'
import Menubs from './pages/Menubs'
import Menubm from './pages/Menubm'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Menu></Menu>}></Route>
    <Route path='/addsong' element={<Menubs></Menubs>}></Route>
    <Route path='/addmusician' element={<Menubm></Menubm>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App