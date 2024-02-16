'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { LuArrowBigDown } from "react-icons/lu";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setData(res.data.results));
  }, []);

  // Filter characters based on search query
  const filteredData = data.filter((character: any) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between h-12 w-full p-3 bg--600">
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-green-600 text-2xl">
              Rick & Morty
            </a>
          </div>
        </div>
        <div className="flex items-center relative space-x-4">
          <input
            className="border rounded-lg border-slate-500 h-10 w-72 pl-10"
            placeholder="Search by name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BiSearch className="absolute left-2" />
        </div>
        <div className="flex items-center space-x-4">
          <LuArrowBigDown className="text-black" size={38} />
        </div>
      </div>
      
      {/* Display filtered characters */}
      <div>
        {filteredData.map((character: any) => (
          <div key={character.id}>
            {/* <p>{character.name}</p> */}
            {/* Add more character details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
