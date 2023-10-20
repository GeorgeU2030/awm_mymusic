import React from 'react'
import { useState, useEffect } from 'react'
import config from '../../config';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

const MainMenu = () => {

  const navigate = useNavigate()

  const [topMusicians, setTopMusicians] = useState([]);
  const [topMusiciansawards, setTopMusiciansawards] = useState([]);

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
  <section className='bg-secondary h-[87vh] w-full md:w-1/2 flex justify-center'>
   <div style={{ marginTop: '3rem' }}>
   <img src={topMusicians.length > 0 ? config.API_BASE_URL + topMusicians[0].photo : 'src/images/headphones.png'} alt="Imagen de músico con más puntos" className='rounded-md border w-60 h-60' />
   <div className="bg-alternative p-4 rounded-md mt-4 flex flex-col">
  <div className="font-bold font-init bg-gray-50 text-yellow-600 mb-2 ml-1 text-xl rounded-md border">
  {topMusicians.length > 0 ? '1. '+ topMusicians[0].name : ''} </div>
  <div className="font-bold font-init bg-gray-50 text-gray-600 mb-2 ml-1 rounded-md border">
  {topMusicians.length > 0 ? '2. '+ topMusicians[1].name : ''} </div>
  <div className="font-bold font-init bg-gray-50 text-amber-900 mb-8 ml-1 rounded-md border">
  {topMusicians.length > 0 ? '3. '+ topMusicians[2].name : ''} </div>
    <div>
  <button className='border-gray-100 text-white bg-red-500 ml-6 font-init rounded-md py-2' style={{width:'10rem'}} 
    onClick={() => {
      navigate('/ranking'); 
    }}
  >
    See Ranking</button>
  </div>
    </div>
   </div>
  </section>
  <section className='bg-base3 h-[87vh] w-full md:w-1/2 flex justify-center'>
  <div style={{ marginTop: '2.5rem' }} >
    <div className="bg-alternative p-4 rounded-md mt-4 flex flex-col justify-center w-60 ml-12">
    <Link to='/addsong'><button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Song</button></Link>
    <Link to='/addmusician'><button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Musician</button></Link>
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Points</button>
  </div>

  <div className='bg-secondary flex flex-row mt-10 '>
  <img src={topMusiciansawards.length > 0 ? config.API_BASE_URL + topMusiciansawards[0].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-md border w-28 h-28'/>
  <img src={topMusiciansawards.length > 0 ? config.API_BASE_URL + topMusiciansawards[1].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-md border w-28 h-28 ml-1'/>
  <img src={topMusiciansawards.length > 0 ? config.API_BASE_URL + topMusiciansawards[2].photo : 'src/images/headphones.png'} alt="Imagen de músico con mas awards" className='rounded-md border w-28 h-28 ml-1'/>
  </div>

  <div className='mt-5 ml-16'>
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md py-2' style={{width:'10rem'}}>Awards</button>
  </div>
    </div>
  </section>
</div>
  )
}

export default MainMenu