import React,{useEffect, useState} from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select';
import axios from 'axios'
import { toast } from 'react-toastify';

const PointsPage = () => {

    const navigate = useNavigate()
    const {handleSubmit,control} = useForm()

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
    
      
      const [musiciansOptions, setMusiciansOptions] = useState([]);
      const [selectedMusicians, setSelectedMusicians] = useState([]);

      useEffect(() => {
   
        axios.get('http://localhost:8000/mymusic/api/v1/musicians/')
          .then((response) => {
            setMusiciansOptions(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener músicos:', error);
          });
      }, []);

      const handleAddPoints = async (classification) => {
        const musicianIds = selectedMusicians.map((musician) => musician.value); 
        
        if (musicianIds.length === 0) {
          toast.error('You must selected at least one musician', {
            position: 'top-center',
            autoClose: 1000,
          });
          return; 
        }
          try {
            await axios.post("http://localhost:8000/mymusic/addpoints/", {
              musicianIds: musicianIds,
              pointsToAdd: 50,
              classification: classification,
            });

            toast.success('You has been added points and award succesfull', {
              position: 'top-center',
              autoClose: 2000, 
              onClose: () => {
                navigate('/')
              },
            });
            
          } catch (error) {
            console.error("Error al agregar puntos a los músicos:", error);
          }
        
      };

      const handleAddPointsWeek = async (points) => {
        const musicianIds = selectedMusicians.map((musician) => musician.value); 
      
        if (musicianIds.length === 0) {
          toast.error('You must selected at least one musician', {
            position: 'top-center',
            autoClose: 1000,
          });
          return; 
        }
          try {
            await axios.post("http://localhost:8000/mymusic/addpointsweek/", {
              musicianIds: musicianIds,
              pointsToAdd: points,
            });

            toast.success('Points has been added succesfull', {
              position: 'top-center',
              autoClose: 2000, 
              onClose: () => {
                navigate('/')
              },
            });
            
          } catch (error) {
            console.error("Error al agregar puntos a los músicos:", error);
          }
        
      };

      const handleAddPointsTroph = async (points,classification) => {
        const musicianIds = selectedMusicians.map((musician) => musician.value); 
        if (musicianIds.length === 0) {
          toast.error('You must selected at least one musician', {
            position: 'top-center',
            autoClose: 1000,
          });
          return; 
        }
          try {
            await axios.post("http://localhost:8000/mymusic/addpointstrophy/", {
              musicianIds: musicianIds,
              pointsToAdd: points,
              classification:classification,
            });

            toast.success('You has been added points and award succesfull', {
              position: 'top-center',
              autoClose: 2000, 
              onClose: () => {
                navigate('/')
              },
            });
            
          } catch (error) {
            console.error("Error al agregar puntos a los músicos:", error);
          }
        
      };

  return (
    <>
    <nav className="bg-primary p-4 flex items-center justify-between">
      <Link to='/'>
      <div className="hidden md:flex items-center ml-16">
    <img src="src/images/headphones.png" className=" w-12 h-12 mr-4"></img>
    <h1 className="text-white text-2xl font-init font-semibold ">
    awm
    </h1>
      </div>
      </Link>
      <div className="hidden md:flex space-x-4 w-1/2 justify-center mr-10">
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>Add Points to your Musicians</h1>
      </div>
      </nav>

<div className='flex justify-center bg-alternative h-[127vh]'>
    <div className='bg-gray-200 w-3/5 flex justify-center mt-8 rounded-lg h-[117vh]'>
<div className="mb-4 w-3/5 mt-8 flex flex-col">
<label htmlFor="musicians" className="block text-gray-700 font-bold mb-2 font-init text-center text-xl">
  Musicians
</label>
<Select
  isMulti
  options={musiciansOptions.map((musician) => ({
    label: musician.name,
    value: musician.id,
    photo: musician.photo,
  }))}
  components={{ Option: customOption }}
  isSearchable={true}
  onChange={(selectedOptions) => setSelectedMusicians(selectedOptions)}
/>

<div className='mt-5 bg-base3 rounded-lg flex py-5'>
<div className='w-1/2 flex flex-col items-center'>
      <button className='mt-2 py-2 border-2 border-blue-500 flex px-3 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('january')}>
      <img
          src="../src/images/ice-crystal.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>January awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-pink-700 flex px-2 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('february')}>
      <img
          src="../src/images/heart.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>February awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-lime-600 flex px-4 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('march')}>
      <img
          src="../src/images/clover.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>March awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-amber-900 flex px-5 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('april')}>
      <img
          src="../src/images/brush.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>April awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-red-700 flex px-5 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('may')}>
      <img
          src="../src/images/rose.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>May awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-yellow-400 flex px-5 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('june')}>
      <img
          src="../src/images/sun.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>June awm</h1>
      </button>
</div>

<div className='w-1/2 flex flex-col items-center'>
      <button className='mt-2 py-2 border-2 border-purple-900 flex px-6 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('july')}>
      <img
          src="../src/images/tomorrowland.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>July awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-sky-400 flex px-4 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('august')}>
      <img
          src="../src/images/drop.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>August awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-emerald-600 flex px-1 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('september')}>
      <img
          src="../src/images/leaf.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>September awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-orange-600 flex px-3 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('october')}>
      <img
          src="../src/images/pumpkin.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>October awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-red-950 flex px-1 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('november')}>
      <img
          src="../src/images/maple-leaf.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>November awm</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-green-900 flex px-1 rounded-lg bg-gray-200'
      onClick={()=>handleAddPoints('december')}>
      <img
          src="../src/images/christmas-tree.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>December awm</h1>
      </button>
</div>

</div>

<div className='bg-base4 mt-3 py-3 rounded-lg flex'>
    <div className='w-1/2 flex flex-col items-center'>
    <button className='mt-2 py-2 border-2 border-red-600 flex px-6 rounded-lg bg-gray-200'
    onClick={()=>handleAddPointsWeek(10)}>
      <img
          src="../src/images/plus.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>Add 2Week</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-red-600 flex px-6 rounded-lg bg-gray-200'
      onClick={()=>handleAddPointsWeek(20)}>
      <img
          src="../src/images/plus.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>Add 3Week</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-red-600 flex px-5 rounded-lg bg-gray-200'
      onClick={()=>handleAddPointsWeek(30)}>
      <img
          src="../src/images/plus.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>Add 4Week + </h1>
      </button>
    </div>
    <div className='w-1/2 flex flex-col items-center'>
    <button className='mt-2 py-2 border-2 border-yellow-600 flex px-6 rounded-lg bg-gray-200'
    onClick={()=>handleAddPointsTroph(100,'sixmonth')}>
      <img
          src="../src/images/troph.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>Six Month</h1>
      </button>
      <button className='mt-2 py-2 border-2 border-yellow-600 flex px-4 rounded-lg bg-gray-200'
      onClick={()=>handleAddPointsTroph(200,'year')}>
      <img
          src="../src/images/winner.png" 
          alt="Imagen 0"
          className="w-6 h-6 rounded-md"
        />
        <h1 className='ml-2 font-init text-sm'>AMW Award</h1>
      </button>
     
    </div>
</div>
</div>
</div>
</div>
</>
  )
}

export default PointsPage