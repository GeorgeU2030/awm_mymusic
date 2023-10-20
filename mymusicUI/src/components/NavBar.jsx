import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <nav className="bg-primary p-4 flex items-center justify-between">
      <Link to='/'>
      <div className="hidden md:flex items-center ml-16">
    <img src="src/images/headphones.png" className=" w-12 h-12 mr-4"></img>
    <h1 className="text-white text-2xl font-init font-semibold ">
    awm
    </h1>
      </div>
      </Link>
      <div className="hidden md:flex space-x-4 w-1/2 justify-end">
        <Link to='/songs'>
        <a className="text-white bg-red-500 font-init font-semibold" style={{ marginRight: '3.5rem' }}>
          Songs
        </a>
        </Link>
        <a href="https://open.spotify.com/intl-es?" className="text-white bg-red-500 font-init font-semibold" style={{ marginRight: '3.5rem' }}>
          Spotify
        </a>
        <a className="text-white bg-red-500 font-init font-semibold" style={{ marginRight: '3.5rem' }}>
          TheMandalorian
        </a>
      </div>
      <div className="md:hidden flex flex-col items-center border">
      <img src="src/images/headphones.png" className="w-8 h-8 mr-4"></img>
      <h1 className="text-white text-2xl font-init font-semibold">
      awc
      </h1>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden top-0 left-0 w-60 h-30 bg-white p-4 flex flex-col justify-center items-center ">

          <a href="#" className="block text-gray-700 mb-2">
            Home
          </a>
          <a href="#" className="block text-gray-700 mb-2">
            About
          </a>
          <a href="#" className="block text-gray-700 mb-2">
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

