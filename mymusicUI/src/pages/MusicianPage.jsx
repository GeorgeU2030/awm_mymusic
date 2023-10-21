import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

function MusicianPage() {
  const { musicianId } = useParams();
  console.log(musicianId)
  const [musician, setMusician] = useState(null);

  const [awards, setAwards] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/mymusic/musicians/${musicianId}/awards`)
      .then((response) => {
        setAwards(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los premios:', error);
      });
  }, [musicianId]);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener los detalles del músico
    axios.get(`http://localhost:8000/mymusic/musicians/${musicianId}`)
      .then((response) => {
        setMusician(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los detalles del músico:', error);
      });
  }, [musicianId]);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener las canciones del músico
    axios.get(`http://localhost:8000/mymusic/musicians/${musicianId}/songs/`)
      .then((response) => {
        setSongs(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error al cargar las canciones del músico:', error);
      });
  }, [musicianId]);

  if (!musician) {
    return <div>Cargando...</div>;
  }

  
 
  // Renderiza los detalles del músico
  return (
    <>
    
    <nav className={"bg-primary p-4 flex items-center justify-between " + 
    (musician && musician.rating !== undefined ?
    (musician.rating > 90 ? 'bg-blue-700' :
     (musician.rating >= 83 && musician.rating <= 90 ? 'bg-teal-700' :
      (musician.rating >= 76 && musician.rating <= 83 ? 'bg-yellow-600' :
       (musician.rating >= 67 && musician.rating <= 75 ? 'bg-gray-700' :
        (musician.rating >= 60 && musician.rating <= 66 ? 'bg-amber-900' : 'bg-primary')
       )
      )
     )
    ) : 'bg-primary'
  )} >
      <Link to='/'>
      <div className="hidden md:flex items-center ml-16">
    <img src="../src/images/headphones.png" className=" w-12 h-12 mr-4"></img>
    <h1 className="text-white text-2xl font-init font-semibold ">
    awm
    </h1>
      </div>
      </Link>
      <div className="hidden md:flex space-x-4 w-1/2 justify-center mr-10">
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>The Musician</h1>
      </div>
      </nav>
      <div className='flex justify-center bg-alternative h-[87vh]'>
      <div className='w-5/6 bg-gray-100 mt-10 rounded-md h-5/6 flex'>
        <section className='w-1/2 flex flex-col justify-center items-center'>
      <img
            src={config.API_BASE_URL + musician.photo}
            alt="Musician Photo"
            className="w-48 h-48 rounded-full "
          />
          
          <div className='mt-2 font-init text-xl font-bold'>
            <h1>{musician.name}</h1>
          </div>
          <div className='mt-2 font-init text-lg font-bold flex justify-center items-center bg-gray-300 px-2 py-2 rounded-md '>
          <img
            src={config.API_BASE_URL + musician.flag}
            alt="Musician Photo"
            className="w-12 h-12 rounded-full "
          />
            <h1 className='ml-5'>{musician.country}</h1>
          </div>
          <div className='font-init text-2xl font-bold mt-2 flex justify-center'>
            <h1>{musician.points}</h1>
            <h1 className='ml-2'> points</h1>
          </div>
          <div className='font-init text-md mt-2 flex justify-center'>
            <h1>Best Position</h1>
            <h1 className='ml-6'>{musician.best_position}°</h1>
          </div>
          <div className='font-init text-md font-bold mt-2 flex justify-center'>
            <h1>Position Rank</h1>
            <h1 className='ml-5'>{musician.current_position}°</h1>
          </div>
          </section>

          <section className='w-1/2 flex'>
          <div className='w-1/2 bg-base3 flex flex-col items-center h-full'>
            <div >
            <h1 className='mt-10 font-init font-semibold text-center'> Songs </h1>
            <div className='overflow-y-auto h-[58vh]'>
            <table className='bg-gray-100 w-48 mt-5'>
  <thead>
    <tr>
      <th ></th>
      <th ></th>
    </tr>
  </thead>
  <tbody>
    {songs.map((song) => (
      <tr key={song.id} className='h-12'>
        <td className='bg-gray-200 w-12 '>
        <img
            src={config.API_BASE_URL + song.album}
            alt="Musician Photo"
            className="w-10 h-10 rounded-md ml-1 "
          />
        </td>
        <td className='bg-gray-200 text-center'>{song.name}</td>
        
      </tr>
    ))}
  </tbody>
  
</table>
</div>

            </div>
          </div>



          <div className='w-1/2 bg-secondary flex flex-col items-center h-full'>
            <div>
              <h1 className='font-init font-semibold mt-10'>Awards</h1>
            </div>


            <div className='overflow-y-auto h-[58vh]'>
            <table className="border-collapse border border-gray-300 mt-5">
  <thead className="bg-secondary">
    <tr>
      <th className="text-center"></th>
      <th className=" text-center"></th>
      <th className=" text-center"></th>
    </tr>
  </thead>
  <tbody className='bg-gray-100'>

  <tr>
      <td className="p-2 text-center">
        
      {musician.rating > 90 ? (
    <img
      src="../src/images/diamond.png" 
      alt="Imagen 0"
      className="w-6 h-6 rounded-md"
    />
    ) : musician.rating >= 83 && musician.rating <= 90 ? (
      <img
      src="../src/images/platino.png" 
      alt="Imagen 0"
      className="w-6 h-6 rounded-md"
    />
      ) : musician.rating >= 76 && musician.rating <= 83 ? (
        <img
      src="../src/images/coin.png" 
      alt="Imagen 0"
      className="w-6 h-6 rounded-md"
    />
      ) : musician.rating >= 67 && musician.rating <= 75 ? (
        <img
      src="../src/images/silver-medal.png" 
      alt="Imagen 0"
      className="w-6 h-6 rounded-md"
    />
      ) : musician.rating >= 60 && musician.rating <= 66 ? (
        <img
      src="../src/images/bronze-medal.png" 
      alt="Imagen 0"
      className="w-6 h-6 rounded-md"
    />
      )
      :(
        "Otro contenido"
      )}
      </td>
      <td className="p-2 text-center text-sm font-init font-bold">Rating</td>
      <td className='font-init text-sm px-5 font-semibold'>{musician.rating}</td>
    </tr>

    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/trophy.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">Songs awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.week || 0}</td>
    </tr>

    {awards.january > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/ice-crystal.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">January awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.january || 0}</td>
    </tr>
    ):null}

    {awards.february > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/heart.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">February awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.february || 0}</td>
    </tr>
    ):null}

    {awards.march > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/clover.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">March awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.march || 0}</td>
    </tr>
    ):null}

    {awards.april > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/brush.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">April awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.april || 0}</td>
    </tr>
    ):null}

    {awards.may > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/rose.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">May awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.may || 0}</td>
    </tr>
    ):null}

    {awards.june > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/sun.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">June awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.june || 0}</td>
    </tr>
    ):null}

    {awards.july > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/tomorrowland.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">July awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.july || 0}</td>
    </tr>
    ) :null}

      {awards.august >0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/drop.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">August awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.august || 0}</td>
    </tr>
      ):null}

    {awards.september > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/leaf.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">September awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.september || 0}</td>
    </tr>
    ):null}

    {awards.october > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/pumpkin.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">October awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.october || 0}</td>
    </tr>
    ):null}

    {awards.november > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/maple-leaf.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">November awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.november || 0}</td>
    </tr>
    ):null}

    {awards.december >0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/christmas-tree.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">December awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.december || 0}</td>
    </tr>
    ): null }

    {awards.sixmonth > 0 ? (
    <tr>
      <td className="p-2 text-center">
        <img
          src="../src/images/troph.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
      </td>
      <td className="p-2 text-center text-xs font-init">SixM awm</td>
      <td className='font-init text-sm px-5 font-semibold'>{awards.sixmonth || 0}</td>
    </tr>
    ) :null}
    
    {awards.year > 0 ? (
  <tr>
    <td className="p-2 text-center">
      <img
        src="../src/images/winner.png" 
        alt="Imagen 0"
        className="w-6 h-6 rounded-md"
      />
    </td>
    <td className="p-2 text-center text-xs font-init">AWM Award</td>
    <td className='font-init text-sm px-5 font-semibold'>{awards.year}</td>
  </tr>
) : null}

    
  </tbody>
</table>
</div>

          </div>
          </section>
      </div>
      </div>
      </>
  );
}

export default MusicianPage;