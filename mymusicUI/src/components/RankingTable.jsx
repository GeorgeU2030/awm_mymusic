import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Link } from 'react-router-dom';

const RankingTable = () => {
  const [data, setData] = useState([]);
  const [maxWeek, setMaxWeek] = useState(0);
  const numWeeksToShow = Math.min(maxWeek, 8); // Mover la declaración aquí

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/mymusic/rankview/');
        setData(response.data.musiciansData);
        setMaxWeek(response.data.maxWeek);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderTableHeader = () => {
    const header = ['Photo', 'Musician'];
    for (let week = maxWeek; week > maxWeek - numWeeksToShow; week--) {
      header.push(`Week ${week}`);
    }
    return header.map((item, index) => (
      <th
        key={index}
        className={`py-2 px-4 text-center text-sm font-init bg-gray-100 border border-gray-300 ${
          item === 'Photo' ? 'min-w-[15vh]' : item === 'Musician' ? 'min-w-[40vh]' : ''
        }`}
      >
        {item}
      </th>
    ));
  };

  const renderTableData = () => {
    return data.map((musician, index) => {
      const row = [
        <div className="flex items-center justify-center">
          <img
            key="photo"
            src={config.API_BASE_URL + '/media/' + musician.photo}
            alt="Musician Photo"
            className="w-16 h-16 rounded-full"
          />
        </div>,
        <span key="musician" className="min-w-[20vh]">
          {musician.name}
        </span>
      ];
      for (let week = maxWeek; week > maxWeek - numWeeksToShow; week--) {
        const position = musician.ranks ? musician.ranks[week] || '-' : '-';
        row.push(
          <span
            key={week}
            className={`font-init ${position === 1 ? 'text-yellow-600 text-xl font-bold' : ''}`}
          >
            {position}
          </span>
        );
      }
      return (
        <tr key={index} className="border">
          {row.map((item, index) => (
            <td key={index} className="py-3 px-4 text-center font-init">
              {item}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <>
      <nav className="bg-primary p-4 flex items-center justify-end">

        <div className="hidden md:flex space-x-4 w-1/2 justify-end mr-20 ">
          <Link to='/rankhistory' className='hover:bg-base3 hover:text-primary rounded-lg '>
        <h1 className='font-init text-white text-xl  mt-2 mb-2 font-semibold animate__animated animate__fadeIn mr-4 ml-4 hover:text-primary'>
            Rank History
          </h1>
          </Link>
          <h1 className='font-init text-white text-xl font-semibold animate__animated animate__fadeIn mt-2'>
            This is the History
          </h1>
        </div>
      </nav>
      <div className="my-8 mx-auto w-3/4 overflow-x-auto">
        <table className="w-full table-auto bg-white">
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody className='text-center'>{renderTableData()}</tbody>
        </table>
      </div>
    </>
  );
};

export default RankingTable;
