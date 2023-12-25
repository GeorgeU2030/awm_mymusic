import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Menu from './pages/Menu'
import Menubs from './pages/Menubs'
import Menubm from './pages/Menubm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PointsMain from './pages/PointsMain'
import SongMain from './pages/SongMain'
import RankingMain from './pages/RankingMain'
import AwardMain from './pages/AwardMain'
import HistoryMain from './pages/HistoryMain'
import MusicianMain from './pages/MusicianMain'
import MusicianList from './pages/MusicianList'
import RankMain from './pages/RankMain'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Menu></Menu>}></Route>
    <Route path='/addsong' element={<Menubs></Menubs>}></Route>
    <Route path='/addmusician' element={<Menubm></Menubm>}></Route>
    <Route path='/songs' element={<SongMain></SongMain>}></Route>
    <Route path='/ranking' element={<RankingMain></RankingMain>}></Route>
    <Route path='/awards' element={<AwardMain></AwardMain>}></Route>
    <Route path='/addpoints' element={<PointsMain></PointsMain>}></Route>
    <Route path="/musician/:musicianId" element={<MusicianMain></MusicianMain>} />
    <Route path='/history' element={<HistoryMain></HistoryMain>}></Route>
    <Route path='/rankhistory' element={<RankMain></RankMain>}></Route>
    <Route path="/inforank/:id" element={<MusicianList></MusicianList>} />
    </Routes>
    <ToastContainer autoClose={3000} position="top-center" />
    </BrowserRouter>
    
  )
}

export default App