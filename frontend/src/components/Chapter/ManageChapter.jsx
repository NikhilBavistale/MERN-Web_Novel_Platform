import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaFileLines, FaStar, FaTags, FaUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageChapter() {
  const { novelId, chapterId } = useParams();
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
        {novel && novel.title}
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <img
          src={novel.imageURL}
          alt={novel.title || "Novel image"}
          className="rounded-md w-full lg:w-64 h-auto object-cover"
        />
        <div className="flex flex-col text-lg md:text-2xl text-gray-600 mt-3 ml-5">
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
            {novel.completed !== undefined ? (
              <span
                className={novel.completed ? "text-green-500" : "text-red-500"}
              >
                {novel.completed ? "Completed" : "Ongoing"}
              </span>
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
              // onClick={() => navigate(`/novels/${novel._id}/chapters`)}
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
        <ul className="text-lg lg:text-3xl text-gray-600 mt-3 ml-5">
          {chapters &&
            chapters.slice(0, displayCount).map((chapter, index) => (
              <li
                key={chapter._id}
                className="flex justify-between items-center p-3 border-b-2 border-gray-200 transition-all hover:bg-gray-100"
              >
                <p className="text-lg font-bold">{index + 1}</p>
                <p className="text-lg font-medium">{chapter.title}</p>
                <Button
                  onClick={() =>
                    navigate(`/update-chapter/${novel._id}/${chapter._id}`)
                  }
                  gradientDuoTone="purpleToPink"
                  className="text-white"
                >
                  Update
                </Button>
              </li>
            ))}
        </ul>
        {displayCount < chapters.length ? (
          <Button
            onClick={() => setDisplayCount(displayCount + 5)}
            gradientDuoTone="purpleToPink"
            className="text-white mt-3"
          >
            Show More
          </Button>
        ) : (
          <p className="text-lg text-gray-600 mt-3">End of list</p>
        )}
      </div>
    </main>
  );
}
