/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const page = () => {
  // https://rickandmortyapi.com/api/character/2
  const params = useParams<{
    id: any;
    tag: string;
    item: string;
  }>();
  console.log(params.id);
  const id = params.id;
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const res = axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => setData(res.data));
  }, []);
  return (
    <div className="w-full flex flex-col items-center  justify-center p-7 gap-5">
      <div className="border w-96 flex flex-col pt-3 items-center border-slate-300 rounded-lg">
        <img className="w-48 h-48 rounded-full" src={data.image} alt="" />

        <div className="flex items-center justify-around flex-wrap w-full">
                <p className="text-xl font-bold">{data.name}</p>
                <p className="text-lg">{data.status}</p>
           
        </div>
        <div className="flex items-center justify-around flex-wrap w-full">
                <p className="text-xl font-bold">{data.location?.name}</p>
                <p className="text-lg">{data.species}</p>
           
        </div>
        <button className="border w-full p-3 rounded-lg">
            {data.gender}
        </button>
      </div>
    </div>
  );
};

export default page;
