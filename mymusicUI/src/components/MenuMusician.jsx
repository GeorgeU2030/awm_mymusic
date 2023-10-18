import React from 'react'
import {useNavigate} from 'react-router-dom'
import { createMusician } from '../api/task.api'
import {useForm} from 'react-hook-form'

const MenuMusician = () => {

  const {register, handleSubmit} = useForm()
  const navigate = useNavigate() 
  const onSubmit = handleSubmit(async data => {
  const formData = new FormData();

  // Agregar los campos de texto
  formData.append('name', data.name);
  formData.append('country', data.country);

  // Agregar los archivos
  formData.append('photo', data.photo[0]);
  formData.append('flag', data.flag[0]);

  // Realizar la solicitud POST con axios
  try {
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    await createMusician(formData);
    // Manejar la respuesta exitosa
    navigate('/');
  } catch (error) {
    // Manejar errores
    console.error(error);
  }
  })
  return (
    <div className="flex items-center justify-center bg-secondary h-[97vh]">
      <div className="bg-gray-100 p-8 rounded shadow-lg max-w-md w-full mt-10 mb-10">
        <h2 className="text-2xl font-bold font-init mb-4 text-center">New Musician</h2>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2 font-init">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border font-bold font-init rounded text-end" {...register('name',{required:true})}/>
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700 font-bold font-init mb-2">Picture</label>
            <input type="file" id="photo" name="photo" accept="image/*" className="w-full p-2 border rounded font-medium font-init" {...register('photo',{required:true})} />
          </div>
          <div className="mb-4">
            <label htmlFor="flag" className="block text-gray-700 font-bold font-init mb-2">Flag</label>
            <input type="file" id="flag" name="flag" accept="image/*" className="w-full p-2 border rounded font-medium font-init" {...register('flag',{required:true})}/>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-bold font-init mb-2">Country</label>
            <input type="text" id="country" name="country" className="w-full p-2 border rounded font-bold font-init text-end" {...register('country',{required:true})}/>
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-base4 transition duration-300"
          >
            Add
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuMusician