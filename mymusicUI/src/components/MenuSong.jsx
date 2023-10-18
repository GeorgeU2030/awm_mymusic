import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const MenuSong = () => {

  const customOption = ({ innerProps, label, data }) => {
    return (
      <div {...innerProps} style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={data.photo} 
      alt={label}
      style={{ width: '30px', height: '30px', marginRight: '10px' }}
    />
    {label}
  </div>
    );
  };
  

  const [song, setSong] = useState({
    musicians: [], 
  });

  const [musiciansOptions, setMusiciansOptions] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost:8000/mymusic/api/v1/musicians/')
      .then((response) => {
        setMusiciansOptions(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener músicos:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSong({
      ...song,
      [name]: value,
    });
  };

  const handleMusiciansChange = (selectedOptions) => {
    setSong({
      ...song,
      musicians: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={song.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
        <select
          id="rating"
          name="rating"
          value={song.rating}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      {/* Otros campos de formulario (startDate, endDate, week, year, genre) */}
      
      <div className="mb-4">
        <label htmlFor="musicians" className="block text-gray-700 font-bold mb-2">Musicians</label>
        <Select
          id="musicians"
          name="musicians"
          isMulti
          options={musiciansOptions.map((musician) => ({
            label: musician.name,
            value: musician.id,
            photo: musician.photo,
          }))}
          onChange={handleMusiciansChange}
          components={{ Option: customOption }}
          isSearchable={true} // Habilita la barra de búsqueda
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Song
        </button>
      </div>
    </form>
  );
};

export default MenuSong;
