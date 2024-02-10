import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NovelList = () => {
  const [novels, setNovels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("api/novels")
      .then((res) => res.json())
      .then((data) => setNovels(data));
  }, []);

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All Novels are here</h2>

      <div className="grid gap-8 my-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 ">
        {novels.map((novel, index) => (
          <Card key={index} className="flex flex-col">
            <div className="aspect-w-4 aspect-h-6">
              <img
                src={novel.imageURL}
                alt=""
                className="object-cover w-full h-full"
              />
              {/*h-96 */}
            </div>
            {/* Content */}
            <div className="flex-grow flex flex-col justify-between p-4">
              <div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <p>{novel.title}</p>
                </h5>

                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {novel.description}
                </p>
              </div>
              <button
                onClick={() => navigate(`/novels/${novel._id}`)}
                className="bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition-colors duration-200"
              >
                Read Now
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NovelList;
