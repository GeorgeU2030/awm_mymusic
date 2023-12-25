// RankingList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RankHistory = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/mymusic/rankhis/');  // Ajusta la URL a tu API de Django
        setRankings(response.data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <>

<nav className="p-4 flex items-center justify-center bg-primary " >
      
      <div className="hidden md:flex space-x-4 w-1/2 justify-end mr-20 mt-4">
        <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn'>Rank History</h1>
      </div>
      </nav>
    <div className="container mx-auto my-8 w-3/4">
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center"></th>
            <th className="py-2 px-4 border-b font-init">Period</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking) => (
            <tr key={ranking.id} className="border-t">
              <td className="py-2 px-4 text-center flex justify-center items-center">
                <img src='src/images/calendar.png' className='w-10 h-10'></img>
              </td>
              <td className="py-2 px-4 text-center font-bold font-init">{ranking.info}</td>
              <td className="py-2 px-4 font-bold font-init ">
                <div className='flex justify-center'>
                <Link
                  to={`/inforank/${ranking.id}`}
                  className="text-blue-500 hover:underline font-bold font-init flex flex-row"
                >
                  Look Musicians
                
                <img src='src/images/jugar.png' className='w-6 h-6'></img>
                </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default RankHistory;
