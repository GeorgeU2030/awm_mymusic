import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Menu from './pages/Menu'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Menu></Menu>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App