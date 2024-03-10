import { Button, Spinner, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFileLines, FaStar, FaTags, FaUser } from "react-icons/fa6";
import TimeDifference from "../TimeDifference";
import { FaInfoCircle } from "react-icons/fa";

export default function SingleNovel() {
  const { novelId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [recentNovels, setRecentNovels] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [chapterCount, setChapterCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNovelAndChapters = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const res = await fetch(`/api/novels/${novelId}`);
        if (!res.ok) {
          throw new Error('Error occurred while fetching novel');
        }
        const data = await res.json();
        setNovel(data);
  
        const recentNovelsRes = await fetch(`/api/novels?limit=5`);
        if (!recentNovelsRes.ok) {
          throw new Error('Error occurred while fetching recent novels');
        }
        const recentNovelsData = await recentNovelsRes.json();
        setRecentNovels(recentNovelsData);
  
        const chapterRes = await fetch(`/api/novels/${novelId}/chapters`);
        if (!chapterRes.ok) {
          throw new Error('Error occurred while fetching chapters');
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
        <p>Error occurred while fetching data: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="p-6 flex flex-col max-w-7xl mx-auto min-h-screen">
      <div className="bg-blue-300 flex flex-col md:flex-row gap-6 rounded-lg items-center p-6">
        <img
          src={novel.imageURL}
          alt={novel.title || "Novel image"}
          className="rounded-md w-full md:w-1/3 h-auto object-cover"
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
          <div className="flex flex-row gap-10 m-3">
            <Button
              onClick={() => {
                if (chapters && chapters.length > 0) {
                  navigate(`/novels/${novel._id}/chapters/${chapters[0]._id}`);
                }
              }}
              gradientDuoTone="purpleToPink"
            >
              Read Now
            </Button>
            <Button
              onClick={() => navigate(`/library`)}
              gradientDuoTone="purpleToPink"
            >
              Add To Library
            </Button>
          </div>
        </div>
      </div>
      <Tabs aria-label="Pills" className="mt-6">
        <Tabs.Item active title="Description">
          <p className="text-lg text-justify text-gray-500 dark:text-gray-400">
            {novel.description}
          </p>
        </Tabs.Item>
        <Tabs.Item title="Table of Contents">
          {chapters && chapters.length > 0 ? (
            <ol className="text-lg text-justify text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-4 ">
              {chapters.map((chapter, index) => (
                <li key={chapter._id} className="mb-4">
                  <a
                    href={`/novels/${novel._id}/chapters/${chapter._id}`}
                    title={chapter.createdAt}
                    className="block p-4 bg-gray-100 rounded-md"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold mr-2">
                        {index + 1}
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
        </Tabs.Item>
        <Tabs.Item title="Author's Note">
          <p className="text-lg text-justify text-gray-500 dark:text-gray-400">
            Notifications about novel
          </p>
        </Tabs.Item>
        <Tabs.Item title="Review">
          <p className="text-lg text-justify text-gray-500 dark:text-gray-400">
            No reviews yet
          </p>
        </Tabs.Item>
        <Tabs.Item title="Comments">
          <p className="text-lg text-justify text-gray-500 dark:text-gray-400">
            Comment section of novel
          </p>
        </Tabs.Item>
      </Tabs>
      <div className="mt-6">
        <h2 className="text-3xl font-serif">Recent Novels</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {recentNovels &&
            recentNovels.slice(0, 5).map((novel) => (
              <div key={novel._id} className="w-full md:w-1/5">
                <img
                  src={novel.imageURL}
                  alt={novel.title}
                  className="rounded-md w-full h-auto object-cover"
                  onClick={() => navigate(`/novels/${novel._id}`)}
                />
                <p className="mt-2 text-lg">{novel.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
