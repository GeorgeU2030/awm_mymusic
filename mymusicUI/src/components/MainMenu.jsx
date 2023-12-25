import React from 'react'
import { useState, useEffect } from 'react'
import config from '../../config';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import {ArrowRight, ArrowLeft} from 'lucide-react'
import { set } from 'react-hook-form';

const MainMenu = () => {

  const navigate = useNavigate()

  const [topMusicians, setTopMusicians] = useState([]);
  const [topMusiciansawards, setTopMusiciansawards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestSong, setLatestSong] = useState([])

  const next = (()=> {
      setCurrentIndex(currentIndex+1)
  })

  const prev = (()=>{
      setCurrentIndex(currentIndex-1)
  })

  useEffect(() => {
    axios.get('http://localhost:8000/mymusic/topmusicians/')
      .then((response) => {
        setTopMusicians(response.data);
        console.log('Top Musicians:', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener a los mejores músicos:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/mymusic/latestsong/')
      .then((response) => {
        setLatestSong(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error al obtener la ultima song:', error);
      });
  }, []);

  useEffect(()=>{
  axios.get('http://localhost:8000/mymusic/topawards/')
  .then((response) => {
    setTopMusiciansawards(response.data);
    console.log('Top Musicians with Awards:', response.data);
  })
  .catch((error) => {
    console.error('Error al obtener a los mejores músicos con premios:', error);
  });
},[])


  return (
    <div className='flex flex-col md:flex-row'>
  <section className='bg-base3 h-[100vh] w-full md:w-1/2 flex justify-center items-center flex-col'>
    <label className='mb-5 font-init font-semibold text-2xl'>Most Points</label>
   <div className='bg-base5 h-2/3 w-2/3 rounded-lg flex flex-col items-center' >
   <img src={topMusicians.length > 0 ? config.API_BASE_URL + topMusicians[currentIndex].photo : 'src/images/headphones.png'} alt="Imagen de músico con más puntos" className='rounded-md border w-72 h-72 mt-5' />
   <div className="font-bold font-init bg-gray-50 mb-2 ml-1 mt-5 text-2xl rounded-md border w-3/4 text-center">
   {topMusicians.length > 0 && (
    <>
      {currentIndex === 0 && (
        <span className="text-yellow-600">1. {topMusicians[currentIndex].name}</span>
      )}
      {currentIndex === 1 && (
        <span className="text-gray-700">2. {topMusicians[currentIndex].name}</span>
      )}
      {currentIndex === 2 && (
        <span className="text-amber-700">3. {topMusicians[currentIndex].name}</span>
      )}
    </>
  )}
   </div>
   </div>
   <div className='flex mt-2'>

   {currentIndex === 1 ? (
    <button onClick={prev}
    className=' bg-base4 text-white px-3 py-1 rounded-md text-2xl mr-28'>
    <ArrowLeft></ArrowLeft>
    </button>
    ) : null}

   {currentIndex === 2 ? (
    <button onClick={prev}
    className=' bg-base4 text-white px-3 py-1 rounded-md text-2xl'>
    <ArrowLeft></ArrowLeft>
    </button>
    ) : null}

   {currentIndex === 0 ? (
    <button onClick={next}
    className=' bg-base4 text-white px-3 py-1 rounded-md text-2xl '>
    <ArrowRight></ArrowRight>
    </button>
    ) : null}

    {currentIndex === 1 ? (
    <button onClick={next}
    className=' bg-base4 text-white px-3 py-1 rounded-md text-2xl ml-28'>
    <ArrowRight></ArrowRight>
    </button>
    ) : null}
    
    </div>
  </section>
  <section className='bg-base3 h-[100vh] w-full md:w-1/2 flex justify-center'>
  <div style={{ marginTop: '2.5rem' }} >
      <div className='text-center mt-2 font-init text-2xl font-bold'>
        Last Song
      </div>
    <div className="w-full flex h-1/5 mt-5">
      <div className='w-1/4 bg-base4 flex flex-col items-center px-1 rounded-tl-md rounded-bl-md'>
      <img src={latestSong ? config.API_BASE_URL+ latestSong.album : 'src/images/headphones.png'} alt="Imagen de músico con más puntos" className='rounded-md border w-20 h-20 mt-5' />
      </div>
      <div className='w-3/4 bg-base4 flex flex-col rounded-tr-md rounded-br-md'>
        <h1 className='mt-5 ml-3 text-2xl font-init font-bold'>{latestSong.name}</h1>
        <label className='mt-2 ml-3 font-init font-semibold overflow-hidden line-clamp-2'>
        {latestSong.musicians && latestSong.musicians.map((musician, index) => (
        <span key={index}>
          {musician.name}
          {index < latestSong.musicians.length - 1 ? ', ' : ''} 
        </span>
        ))}
        </label>
      </div>
    </div>
      <div className='text-center font-init font-bold text-2xl mt-12'>
        Most Awards
      </div>
  <div className='bg-base3 flex flex-row mt-5 justify-center '>
  <img src={topMusiciansawards.length > 0 ? config.API_BASE_URL + topMusiciansawards[0].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-lg border w-32 h-32 ml-2'/>
  <img src={topMusiciansawards.length > 1 ? config.API_BASE_URL + topMusiciansawards[1].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-lg border w-32 h-32 ml-2'/>
  <img src={topMusiciansawards.length > 2 ? config.API_BASE_URL + topMusiciansawards[2].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-lg border w-32 h-32 ml-2 mr-2'/>
  </div>
  <div className='bg-base2 flex flex-row justify-center'>
      <label className='w-32 text-center h-10 mt-3 text-2xl font-semibold flex justify-center ml-2'>{topMusiciansawards.length >0 ? topMusiciansawards[0].award_count : null} <img src='./src/images/trophy.png' className='w-10 h-10'></img></label>
      <label className='w-32 ml-2 text-center h-10 mt-3 text-2xl font-semibold flex justify-center'>{topMusiciansawards.length >0 ? topMusiciansawards[1].award_count : null} <img src='./src/images/trophy.png' className='w-10 h-10'></img> </label>
      <label className='w-32 ml-2 text-center h-10 mt-3 text-2xl font-semibold flex justify-center'>{topMusiciansawards.length >0 ? topMusiciansawards[2].award_count : null} <img src='./src/images/trophy.png' className='w-10 h-10'></img> </label>
  </div>
    </div>
  </section>
</div>
  )
}

export default MainMenu