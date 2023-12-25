// MusicianList.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MusicianTable from '../components/MusicianTable';
import { Link } from 'react-router-dom';

const MusicianList = () => {
  const { id } = useParams();  
  const [musicians, setMusicians] = useState([]);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/mymusic/rankmushis/${id}/`);  // Ajusta la URL según tu configuración de Django
        setMusicians(response.data.musicians);
      } catch (error) {
        console.error('Error fetching musicians:', error);
      }
    };

    fetchMusicians();
  }, [id]);  

  return (
    <>
    <nav className="p-4 flex items-center justify-end bg-primary " >
      
      <div className="hidden md:flex space-x-4 w-1/2 justify-end mr-20 ">
      <Link to='/rankhistory' className='hover:bg-base3 hover:text-red-600 rounded-lg '>
        <h1 className='font-init text-white text-xl  mt-2 mb-2 font-semibold animate__animated animate__fadeIn mr-4 ml-4 hover:text-primary'>
            Rank History
          </h1>
      </Link>
        <h1 className='font-init text-white text-xl mt-2 font-semibold animate__animated animate__fadeIn'>List of Musician</h1>
      </div>
      </nav>

    <div className="container mx-auto my-8 w-3/4">
      <div className='bg-base3 font-init font-semibold flex justify-center py-4'>
      <h1>{musicians.info}</h1>
      </div>
      <MusicianTable musicians={musicians.musicians} />
    </div>
    </>
  );
};

export default MusicianList;
