import React from 'react';
import config from '../../config';

const MusicianTable = ({ musicians }) => {

  if (!musicians) {
    return <p>No hay músicos para mostrar.</p>;
  }
  
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b font-init">#</th>
          <th className="py-2 px-4 border-b font-init"></th>
          <th className="py-2 px-4 border-b font-init">Name</th>
          <th className="py-2 px-4 border-b font-init">Country</th>
          <th className="py-2 px-4 border-b font-init">Points</th>
        </tr>
      </thead>
      <tbody>
        {musicians.map((musician, index) => (
          <tr key={index} className="border-t">
            <td className="py-2 px-4 text-center font-init font-semibold">{index + 1}</td>
            <td className="py-2 px-4 flex justify-center ">
              <img
                src={config.API_BASE_URL +musician.musician.photo}  
                alt={musician.musician.name}
                className="w-12 h-12 rounded-full"
              />
            </td>
            <td className="py-2 px-4 text-center font-init font-semibold">{musician.musician.name}</td>
            <td className="py-2 px-4">
            <div className=' flex justify-center'>
            <img
                src={config.API_BASE_URL +musician.musician.flag}  
                alt={musician.musician.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
            </td>
            
            <td className="py-2 px-4 text-center font-init font-semibold">{musician.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MusicianTable;

