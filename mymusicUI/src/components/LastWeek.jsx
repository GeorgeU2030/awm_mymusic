import { useEffect, useState } from 'react';
import axios from 'axios';

function LastWeek() {
  const [lastWeek, setLastWeek] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET a la URL de tu API
    axios.get('http://localhost:8000/mymusic/lastweek/')
      .then((response) => {
        setLastWeek(response.data.week);
      })
      .catch((error) => {
        console.error('Error al obtener la semana:', error);
      });
  }, []);

  return (
    <div className='flex py-4'>
        <label htmlFor="week" className="block text-gray-700 font-bold mb-2 ml-5 mt-2">Week</label>
        {lastWeek !== null ? (
        <input
          type="text"
          name="week"
          value={lastWeek}
          readOnly={true}
          className="border p-2 rounded text-gray-800 w-2/5 ml-16 text-right"
        />
      ) : (
        <p>No se encontró información de la última semana.</p>
      )}
    </div>
  );
}

export default LastWeek;
