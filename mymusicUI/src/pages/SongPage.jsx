import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import 'animate.css/animate.min.css';


const SongPage = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/mymusic/allsongs/')
          .then((response) => {
            setSongs(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener las canciones:', error);
          });
      }, []);


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState(songs);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
      const filtered = songs.filter((song) =>
      song.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }, [songs, searchTerm]);

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
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>Your Songs</h1>
      </div>
      </nav>

    <div className='flex justify-center mt-6'>
  <input
    type="text"
    placeholder="Search Song by Name"
    className="px-3 py-2 w-2/5 border-2 rounded-md focus:outline-none focus:border-primary focus:border-3 text-end"
    value={searchTerm}
    onChange={handleSearch}
  />
  </div>

      <div>
      <table className="mx-auto w-full md:w-4/5 lg:w-11/12 border-collapse border border-gray-300 mt-10">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-2 text-center text-sm font-init bg-alternative">Album</th>
      <th className="py-2 px-6 text-center text-sm font-init bg-alternative">Name</th>
      <th className="py-2 px-8 text-center text-sm font-init bg-alternative">Musicians</th>
      <th className="py-2 px-2 text-center text-sm font-init bg-alternative">Rate</th>
      <th className="py-2 px-3 text-center text-sm font-init bg-alternative">Start Date</th>
      <th className="py-2 px-3 text-center text-sm font-init bg-alternative">End Date</th>
      <th className="py-2 px-2 text-center text-sm font-init bg-alternative">Week</th>
      <th className="py-2 px-2 text-center text-sm font-init bg-alternative">Release</th>
      <th className="py-2 px-2 text-center text-sm font-init bg-alternative">Genre</th>
    </tr>
  </thead>
  <tbody>
    {filteredSongs.map((song) => (
      <tr key={song.id}>
        <td className="py-3 flex items-center justify-center">
          <img
            src={config.API_BASE_URL + song.album}
            alt="Album"
            width="100"
            height="100"
            className="rounded-md"
          />
        </td>
        <td className="py-3 px-6 text-center font-init">{song.name}</td>
        <td className="py-3 px-8 text-center font-init">
        {song.musicians.map((musician, index) => (
        <React.Fragment key={musician.id}>
        {musician.name}
        {index < song.musicians.length - 1 && <br />}
        </React.Fragment>
        ))}
        </td>
        <td className={`py-3 px-3 text-center text-xl font-bold font-init ${song.rating === 'A+' ? 'text-blue-700' : song.rating === 'A' ? 'text-teal-700' : song.rating === 'B+' ? 'text-yellow-600' : song.rating === 'B' ? 'text-gray-800' : song.rating === 'C' ? 'text-amber-900' : ''}`}>
        {song.rating}
        </td>
        <td className="py-3 px-3 text-center font-init">{song.start_date}</td>
        <td className="py-3 px-3 text-center font-init">{song.end_date}</td>
        <td className="py-3 px-2 text-center font-init">{song.week}</td>
        <td className="py-3 px-2 text-center font-init">{song.release_year}</td>
        <td className="py-3 px-2 text-center text-sm font-init">{song.genre}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
    </>
  )
}

export default SongPage