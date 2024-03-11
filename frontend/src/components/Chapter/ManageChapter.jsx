import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaFileLines } from "react-icons/fa6";
import { FaInfoCircle, FaStar, FaTags, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import TimeDifference from "../TimeDifference";

export default function ManageChapter() {
  const { novelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [chapterCount, setChapterCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    const fetchNovelAndChapters = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/novels/${novelId}`);
        if (!res.ok) {
          throw new Error("Error occurred while fetching novel");
        }
        const data = await res.json();
        setNovel(data);

        const chapterRes = await fetch(`/api/novels/${novelId}/chapters`);
        if (!chapterRes.ok) {
          throw new Error("Error occurred while fetching chapters");
        }
        const chapterData = await chapterRes.json();
        setChapters(chapterData);
        setChapterCount(chapterData.length);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovelAndChapters();
  }, [novelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error occurred while fetching data</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        Manage Chapters
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <img
          src={novel.imageURL}
          alt={novel.title || "Novel image"}
          className="rounded-md w-full lg:w-64 h-auto object-cover"
        />
        <div className="flex flex-col text-lg md:text-2xl text-gray-600 mt-3 ml-5">
          <h1 className="text-4xl mt-6 text-center font-serif max-w-3xl mx-auto lg:text-5xl">
            {novel && novel.title}
          </h1>
          <div className="flex items-center">
            <FaUser className="mr-2" />
            Author: {novel.authorName}
          </div>
          <div className="flex items-center">
            <FaTags className="mr-2" />
            Genre:{" "}
            {novel.genres.map((genre) => genre.name).join(", ") || "Unknown"}
          </div>
          <div className="flex items-center">
            <FaStar className="mr-2" />
            Rating: {novel.rating}
          </div>
          <div className="flex items-center">
            <FaInfoCircle className="mr-2" />
            Status:{" "}
            {novel.status === "completed" ? (
              <span className="text-red-500">Completed</span>
            ) : novel.status === "paused" ? (
              <span className="text-yellow-500">Paused</span>
            ) : novel.status === "ongoing" ? (
              <span className="text-green-500">Ongoing</span>
            ) : (
              "Unknown"
            )}
          </div>
          <div className="flex items-center">
            <FaFileLines className="mr-2" />
            Chapters: {chapterCount}
          </div>
          <div className="flex items-center">
            <FaFileLines className="mr-2" />
            Published: {new Date(novel.createdAt).toDateString()}
          </div>
          <div className="flex items-center">
            <FaFileLines className="mr-2" />
            Updated: {new Date(novel.updatedAt).toDateString()}
          </div>

          <div className="flex flex-row gap-10 m-3">
            <Button
              onClick={() => navigate(`/create-chapter/${novel._id}`)}
              gradientDuoTone="purpleToPink"
            >
              Add Chapter
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-serif">Chapter List</h2>
        <div className="text-lg lg:text-3xl text-gray-600 mt-3 mx-1">
          {chapters && chapters.length > 0 ? (
            <ol className="text-lg text-justify text-gray-500 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.slice(0, displayCount).map((chapter) => (
                <li key={chapter._id} className="mb-4">
                  <a
                    href={`/update-chapter/${novel._id}/${chapter._id}`}
                    title={chapter.title}
                    className="block p-4 bg-gray-100 rounded-md"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold mr-2">
                        {chapter.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <TimeDifference startDate={chapter.createdAt} />
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No chapter yet
            </p>
          )}
        </div>

        <div className="mt-3 ml-5">
          {displayCount < chapters.length ? (
            <Button
              onClick={() => setDisplayCount(displayCount + 5)}
              gradientDuoTone="purpleToPink"
              className="text-white"
            >
              Show More
            </Button>
          ) : (
            <p className="text-lg text-gray-600">End of list</p>
          )}
        </div>
      </div>
    </main>
  );
}
