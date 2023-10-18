import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import LastWeek from './LastWeek';
import {useForm, Controller} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { createSong } from '../api/task.api';

const MenuSong = () => {


  const {register, handleSubmit,control} = useForm()
  const navigate = useNavigate() 

  const onSubmit = handleSubmit(async data => {
  const formData = new FormData();

  // Agregar los campos de texto
  formData.append('name', data.name);
  formData.append('rating', data.rating);

  // Agregar los archivos
  formData.append('start_date', data.startDate);
  formData.append('end_date', data.endDate);
  formData.append('week', data.week);
  formData.append('release_year', data.year);
  formData.append('genre', data.genre);
  formData.append('album', data.album[0]);

  const selectedMusicianIds = data.musicians.map((musician) => musician.value);
  formData.append('musicians', selectedMusicianIds);

  try {
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    await createSong(formData)
    // Manejar la respuesta exitosa
    navigate('/');
  } catch (error) {
    // Manejar errores
    console.error(error);
  }
  })

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



  return (
    <div className="flex items-center justify-center bg-base4 h-[127vh]">
    <div className="bg-gray-100 p-8 rounded shadow-lg w-1/2 mt-10 mb-10">
    <h2 className="text-2xl font-bold font-init mb-4 text-center">New Song</h2>
    <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit} encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border rounded text-right"
          {...register('name', { required: true })}
        />
      </div>

      <div className="mb-4 flex">
        <div className='w-1/2 '>
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2 ml-5">Rating</label>
        <select
          id="rating"
          name="rating"
          
          className="p-2 border rounded ml-5 w-4/5"
          {...register('rating', { required: true })}
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        </div>
        <div className='w-1/2 mt-4 '>
        <LastWeek register={register}></LastWeek>
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
    {...register('startDate', { required: true })}
  />
</div>

<div className="mb-4 w-1/2">
  <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2 ml-5">End Date</label>
  <input
    type="date"
    id="endDate"
    name="endDate"
    className="w-4/5 ml-5 p-2 border rounded text-right"
    {...register('endDate', { required: true })}
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
    {...register('year', { required: true })}
  />
</div>

<div className="mb-4 w-1/2">
  <label htmlFor="genre" className="block text-gray-700 font-bold mb-2 ml-5">Genre</label>
  <input
    type="text"
    id="genre"
    name="genre"
    className="w-4/5 ml-5 p-2 border rounded text-right"
    {...register('genre', { required: true })}
  />
</div>
</div>

<div className="mb-4">
            <label htmlFor="album" className="block text-gray-700 font-bold font-init mb-2">Album</label>
            <input type="file" id="album" name="album" accept="image/*" className="w-full p-2 border rounded font-medium font-init" {...register('album',{required:true})} />
          </div>
          <div className="mb-4">
      <label htmlFor="musicians" className="block text-gray-700 font-bold mb-2">
        Musicians
      </label>
      <Controller
        name="musicians"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            id="musicians"
            isMulti
            options={musiciansOptions.map((musician) => ({
              label: musician.name,
              value: musician.id,
              photo: musician.photo,
            }))}
            components={{ Option: customOption }}
            isSearchable={true}
            {...field}
          />
        )}
      />
    </div>

      <div className="mb-4 flex justify-center">
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition duration-300 mt-4"
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
