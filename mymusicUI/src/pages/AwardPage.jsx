import React, {useEffect, useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import config from '../../config';

const AwardPage = () => {

  const navigate = useNavigate();

  const handleRowClick = (musicianId) => {
    navigate('/musician/'+musicianId);
  };

  const [musicians, setMusicians] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/mymusic/sortawards/')
            .then((response) => {
                setMusicians(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener músicos:', error);
            });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMusicians, setFilteredMusicians] = useState(musicians);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
      const filtered = musicians.filter((musician) =>
      musician.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredMusicians(filtered);
    }, [musicians, searchTerm]);

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
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>Your Music Awards</h1>
      </div>
      </nav>

      <div className='flex justify-center mt-6'>
  <input
    type="text"
    placeholder="Search Musician by Name"
    className="px-3 py-2 w-2/5 border-2 rounded-md focus:outline-none focus:border-primary focus:border-3 text-end"
    value={searchTerm}
    onChange={handleSearch}
  />
  </div>
  
      <table className="mx-auto w-full md:w-4/5 lg:w-11/12 border-collapse border border-gray-300 mt-10">
      <thead className="bg-gray-100">
          <tr>
              <th className="py-2 text-center text-sm font-init bg-alternative">Position</th>
              <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Photo</th>
              <th className="py-2 text-center text-sm font-init bg-alternative">Name</th>
              <th className="py-2 text-center text-sm font-init bg-alternative">Country</th>
              <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Awards</th>
              <th className='py-2 px-6 bg-alternative'></th>
          </tr>
      </thead>
      <tbody>
          {filteredMusicians.map((musician, index) => (
              <tr key={musician.id} 
              onClick={() => handleRowClick(musician.id)}>
                  <td className="py-3 px-6 text-center font-init">{index + 1}</td>
                  <td className="py-3 px-6 font-init flex items-center justify-center">
          <img
            src={config.API_BASE_URL + musician.photo}
            alt="Musician Photo"
            className="w-20 h-20 rounded-full"
          />
        </td>
                  <td className="py-3 px-6 text-center font-init cursor-default">{musician.name}</td>

                  <td className="py-3 px-6 font-init ">
          <div className="h-auto flex justify-center">
    <img
      src={config.API_BASE_URL + musician.flag}
      alt="Musician Photo"
      className="w-10 h-10 rounded-full"
    />
  </div>
        </td>
                  <td className="py-3 px-6 text-center font-init text-2xl">{musician.awards.length}</td>
                  <td>
                  <img
      src={'src/images/trophy.png'}
      alt="Musician Photo"
      className="w-10 h-10 rounded-full"
    />
                  </td>
              </tr>
          ))}
      </tbody>
  </table>
  </>
  )
}

export default AwardPage