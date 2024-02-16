/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuArrowBigDown } from "react-icons/lu";
const page = () => {
  const [data, setData] = useState([] as any);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const res = axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setData(res.data.results));
  }, []);

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
    <>
      {" "}

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
      {searchQuery ?(
        <div>
        {filteredData.map((character: any) => (
          <div key={character.id}>
            <div className="flex items-center justify-center flex-wrap gap-3">
              <div
                key={character.id}
                className="flex flex-col items-center border mt-4  w-56 h-72 p-3 shadow-2xl rounded-lg justify-center gap-3"
              >
                <img
                  src={character.image}
                  alt=""
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-center">
                  <p>{character.name}</p>
                  <p>{character.type}</p>
                  <p>{character.status}</p>
                  <p>{character?.location?.name}</p>
                  <Link href={`${character.id}`}>
                    <button className="bg-green-400 border rounded-lg shadow-lg p-2 w-56">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
           
          </div>
        ))}
      </div>
      ):(
        <div className="flex items-center justify-center flex-wrap gap-3">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col items-center border mt-4  w-56 h-72 p-3 shadow-2xl rounded-lg justify-center gap-3"
          >
            <img src={item.image} alt="" className="w-32 h-32 rounded-full" />
            <div className="text-center">
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.status}</p>
              <p>{item?.location?.name}</p>
              <Link href={`${item.id}`}>
                <button className="bg-green-400 border rounded-lg shadow-lg p-2 w-56">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div> 
      )}

     
    </>
  );
};

export default page;
