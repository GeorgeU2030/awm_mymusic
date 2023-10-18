import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import LastWeek from './LastWeek';

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
    <div className="flex items-center justify-center bg-base4 h-[127vh]">
    <div className="bg-gray-100 p-8 rounded shadow-lg w-1/2 mt-10 mb-10">
    <h2 className="text-2xl font-bold font-init mb-4 text-center">New Song</h2>
    <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border rounded text-right"
        />
      </div>

      <div className="mb-4 flex">
        <div className='w-1/2 '>
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2 ml-5">Rating</label>
        <select
          id="rating"
          name="rating"
          
          className="p-2 border rounded ml-5 w-4/5"
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        </div>
        <div className='w-1/2 mt-4 '>
        <LastWeek></LastWeek>
        </div>
      </div>
      
      <div className="mb-4 flex">
  <div className='w-1/2'>
  <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2 ml-5">Start Date</label>
  <input
    type="date"
    id="startDate"
    name="startDate"
    className="p-2 border rounded text-right w-4/5 ml-5"
    
  />
</div>

<div className="mb-4 w-1/2">
  <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2 ml-5">End Date</label>
  <input
    type="date"
    id="endDate"
    name="endDate"
    className="w-4/5 ml-5 p-2 border rounded text-right"
  
  />
</div>
</div>

<div className='flex mb-4'>
<div className="mb-4 w-1/2">
  <label htmlFor="year" className="block text-gray-700 font-bold mb-2 ml-5">Year Release</label>
  <input
    type="number"
    id="year"
    name="year"
    className="w-4/5 ml-5 p-2 border rounded text-right"
  />
</div>

<div className="mb-4 w-1/2">
  <label htmlFor="genre" className="block text-gray-700 font-bold mb-2 ml-5">Genre</label>
  <input
    type="text"
    id="genre"
    name="genre"
    className="w-4/5 ml-5 p-2 border rounded text-right"
   
  />
</div>
</div>

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
    </div>
    </div>
  );
};

export default MenuSong;
