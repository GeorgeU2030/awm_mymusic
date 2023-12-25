import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import config from '../../config';
import 'animate.css/animate.min.css';

const Rankingpage = () => {

    const [musicians, setMusicians] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/mymusic/ranking/')
      .then((response) => {
        setMusicians(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de músicos:', error);
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


    const getRatingImage = (rating) => {
      if (rating > 90) {
        
        return "src/images/diamante.png" ;
      } else if (rating >= 83 && rating <= 90) {
        return "src/images/rubi.png" ;
      } else if (rating >= 76 && rating < 83) {
        return "src/images/esmeralda.png";
      } else if (rating >= 67 && rating < 75) {
        return "src/images/zafiro.png";
      } else if (rating >= 60 && rating < 67) {
        return "src/images/oro.png";
      } 
    
      return <img src="/images/headphones.png" alt="Default" className="w-12 h-12" />;
    };
    

  return (
    <>
    <nav className="bg-primary p-4 flex items-center justify-end">
      
      <div className="hidden md:flex space-x-4 w-1/2 justify-end mr-20 mt-3">
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>This is the Ranking</h1>
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

<div className='overflow-y-auto h-[77vh]'>
      <table className="mx-auto w-full md:w-4/5 lg:w-11/12 border-collapse border border-gray-300 mt-10">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-2 text-center text-sm font-init bg-alternative">Position</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Photo</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Name</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Country</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Points</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Rating</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative"></th>
    </tr>
  </thead>
  <tbody>
    {filteredMusicians.map((musician) => (
      <tr key={musician.id}>
        <td className="py-3 px-3 text-center font-init">{musician.current_position}</td>
        <td className="py-3 px-6 font-init flex items-center justify-center">
          <img
            src={config.API_BASE_URL + musician.photo}
            alt="Musician Photo"
            className="w-16 h-16 rounded-full"
          />
        </td>
        <td className="py-3 px-6 text-center font-init">{musician.name}</td>
        <td className="py-3 px-6 text-center font-init">{musician.country}</td>
        <td className="py-3 px-6 text-center font-init text-xl">{musician.points}</td>
        <td className="py-3 px-6 text-center font-init text-xl">{musician.rating}</td>
        <td className="py-3 px-6 text-center font-init text-xl">
        <img className='w-8 h-8'
            src={getRatingImage(musician.rating)}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

 
</>
      
  )
}

export default Rankingpage