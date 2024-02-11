/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

const page = () => {
  const [shortCutData, setShortcutData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.testvalley.kr/main-banner/all"
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.testvalley.kr/main-shortcut/all"
        );
        setShortcutData(response.data);
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://api.testvalley.kr/collections?prearrangedDiscount"
        );
        setCollections(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center pt-7 p-5  flex-col gap-10">
        <div className="relative w-full  h-80">
          {images.length > 0 && (
            <>
              <img
                className="object-cover w-full h-full"
                src={images[currentIndex].mobileImageUrl}
                alt={images[currentIndex].mobileImageUrl}
              />
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={goToPrevSlide}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={goToNextSlide}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex mt-12 ml-5 w-full items-center justify-center gap-5">
        {shortCutData.map((data: any) => {
          return (
            <div className="flex  gap-5" key={data.mainShortcutId}>
              <a href={data.linkUrl} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col">
                  <img src={data.imageUrl} alt={data.title} />

                  <h1>{data.title}</h1>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div className="flex w-full gap-7 mt-10">
        <div className="flex overflow-x-auto space-x-4 p-4">
          <div className="w-64 flex-shrink-0">
            {" "}
            {/* Apply flex-shrink-0 here */}
            <h1 className="">HOT DEALS</h1>
            <p>[UP TO 34% OFF] HAPPY HOUR</p>
          </div>
          {collections?.items?.map((collection) => (
            <div
              key={collection.id}
              className="flex-shrink-0 w-64 bg-gray-200 rounded-lg p-4"
            >
              <img
                src={collection.media[0]?.uri}
                alt={collection.title}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">{collection.title}</h2>
              <p className="text-gray-600">{collection.description}</p>
              <p className="flex items-center">
                <MdOutlineStarPurple500 />
                {collection.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex  w-full gap-7 mt-10">
        <div className="flex gap-5 flex-wrap">
          {collections?.items?.map((collection: any) => (
            <div
              key={collection.id}
              className="flex flex-col gap-2  w-64 bg-gray-200 rounded-lg p-4"
            >
              <img
                src={collection.media[0]?.uri}
                alt={collection.title}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">{collection.title}</h2>
              <p className="text-gray-600">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
