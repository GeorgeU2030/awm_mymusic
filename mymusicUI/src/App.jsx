import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Menu from './pages/Menu'
import Menubs from './pages/Menubs'
import Menubm from './pages/Menubm'
import SongPage from './pages/SongPage'
import Rankingpage from './pages/Rankingpage'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Menu></Menu>}></Route>
    <Route path='/addsong' element={<Menubs></Menubs>}></Route>
    <Route path='/addmusician' element={<Menubm></Menubm>}></Route>
    <Route path='/songs' element={<SongPage></SongPage>}></Route>
    <Route path='/ranking' element={<Rankingpage></Rankingpage>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App