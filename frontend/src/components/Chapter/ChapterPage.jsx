import { Button, Pagination, Select, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../Comment/CommentSection";
import DisplayOptions from "../DispalyOptions";

export default function ChapterPage() {
  const { chapterId, novelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/novels/${novelId}/chapters/${chapterId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setChapter(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchChapter();
  }, [novelId, chapterId]);

  useEffect(() => {
    const fetchRecentChapters = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/novels/${novelId}/chapters`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setChapters(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRecentChapters();
  }, [novelId]);

  useEffect(() => {
    if (chapters) {
      const currentChapter = chapters.find((chap) => chap._id === chapterId);
      setChapter(currentChapter);
    }
  }, [chapters, chapterId]);

  const navigateToChapter = (direction) => {
    const currentIndex = chapters.findIndex((chap) => chap._id === chapterId);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < chapters.length) {
      navigate(`/novels/${novelId}/chapters/${chapters[newIndex]._id}`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <div className="flex flex-col">
      <DisplayOptions className="z-10" />
      <div className="flex flex-col items-center">
        {/* Pagination */}
        <div className="flex overflow-x-auto items-center sm:justify-center">
          <Button
            disabled={!chapter || !chapters || chapter.number === 1}
            onClick={() => navigateToChapter("prev")}
            gradientDuoTone="purpleToPink"
          >
            Previous
          </Button>
          <Select
            value={chapter ? chapter.number : ""}
            className="mx-2"
            onChange={(event) => {
              const newChapterNumber = event.target.value;
              const newChapter = chapters.find(
                (chap) => chap.number === parseInt(newChapterNumber, 10)
              );
              if (newChapter) {
                navigate(`/novels/${novelId}/chapters/${newChapter._id}`);
              }
            }}
          >
            {chapters &&
              chapters.map((chap, index) => (
                <option key={index} value={chap.number}>
                  Chapter {chap.number}
                </option>
              ))}
          </Select>

          <Button
            disabled={
              !chapter || !chapters || chapter.number === chapters.length
            }
            onClick={() => navigateToChapter("next")}
            gradientDuoTone="purpleToPink"
          >
            Next
          </Button>
        </div>
      </div>
      {/* content  */}
      <section className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {chapter && chapter.title}
        </h1>

        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>
            {chapter && new Date(chapter.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {chapter && (chapter.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full chapter-content"
          dangerouslySetInnerHTML={{ __html: chapter && chapter.content }}
        ></div>
        <div className="max-w-4xl mx-auto w-full">{/* <CallToAction /> */}</div>
        <CommentSection chapterId={chapter._id} />
        {chapters && (
          <div className="flex flex-col gap-4 mt-10">
            <h2 className="text-2xl font-bold">Reading History</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {chapters.slice(0, 2).map((chapter) => (
                <div key={chapter._id} className="flex flex-col">
                  <Link to={`/novels/${novelId}/chapters/${chapter._id}`}>
                    <h3 className="text-lg mt-3">{chapter.title}</h3>
                  </Link>
                  <p className="text-gray-600">
                    {chapter.novel && chapter.novel.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
