/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([] as any);
  // console.log(data);

  useEffect(() => {
    const res = axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setData(res.data.results));
  }, []);

  return (
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
  );
};

export default page;
