import { Button, Label, Pagination, Select, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../Comment/CommentSection";
// import DisplayOptions from "../DispalyOptions";

export default function ChapterPage() {
  const { chapterId, novelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [novelTitle, setNovelTitle] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [fontSize, setFontSize] = useState("text-base");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [background, setBackground] = useState("bg-White");
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };
  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };
  const handleThemeChange = (event) => {
    setBackground(event.target.value);
  };
  //Fetch chapters
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
  //Fetch recent chapters
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
  const fetchNovelTitle = async (novelId) => {
    try {
      const response = await fetch(`/api/novels/${novelId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch novel");
      }
      const novel = await response.json();
      console.log(novel.title);
      return novel.title;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    if (chapters) {
      const currentChapter = chapters.find((chap) => chap._id === chapterId);
      setChapter(currentChapter);
      fetchNovelTitle(novelId).then(setNovelTitle);
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
    <div className={`flex flex-col m-1 ${background}`}>
      <div className="flex flex-col m-1 items-center">
        <Button
          onClick={() => setShowDisplayOptions(!showDisplayOptions)}
          gradientDuoTone={showDisplayOptions ? "purpleToPink" : "purpleToBlue"}
        >
          Display Options
        </Button>
        {showDisplayOptions && (
          <div className="display-options m-1 p-4 bg-white shadow-md rounded-md">
            <h2 className="flex flex-row text-2xl font-bold mb-4">
              Display Options
            </h2>
            <div className="p-3">
              <Label htmlFor="font-size" className="mr-2">
                Font size:
              </Label>
              <Select
                id="font-size"
                value={fontSize}
                onChange={handleFontSizeChange}
              >
                <option value="text-sm">Small</option>
                <option value="text-base">Normal</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
              </Select>
            </div>
            <div className="p-3">
              <Label htmlFor="font-family" className="mr-2 ">
                Font Family:
              </Label>
              <Select
                id="font-family"
                value={fontFamily}
                onChange={handleFontFamilyChange}
              >
                <option value="font-sans">Sans</option>
                <option value="font-serif">Serif</option>
                <option value="font-mono">Mono</option>
              </Select>
            </div>
            <div className="p-3">
              <Label htmlFor="background" className="mr-2 ">
                Theme:
              </Label>
              <Select
                id="background"
                value={background}
                onChange={handleThemeChange}
              >
                <option value="bg-White">White</option>
                <option value="bg-Dark">Dark</option>
                <option value="bg-Light-blue ">Light Blue</option>
                <option value="bg-Light-grey">Light Grey</option>
                <option value="bg-Light-screen">Light Yellow</option>
                <option value="bg-Sepia">Sepia</option>
                <option value="bg-Wood-grain">Wood Grain</option>
                <option value="bg-Dark-blue">Dark Blue</option>
                <option value="bg-Dark-yellow">Dark Yellow</option>
              </Select>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className="flex m-1 p-2 overflow-x-auto items-center sm:justify-center">
          <Button
            disabled={!chapter || !chapters || chapter.number === 1}
            onClick={() => navigateToChapter("prev")}
            gradientDuoTone="purpleToPink"
          >
            Previous
          </Button>
          <Select
            value={chapter ? chapter.number : ""}
            className="w-full mx-1 sm:w-1/2 lg:w-1/3"
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
                  Chapter {chap.number} : {chap.title}
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
      <section className="p-3 flex flex-col">
        <h1 className="text-3xl p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {/* Show Novel title */}
          {novelTitle}
        </h1>
        <h2 className="text-2xl p-3 text-center font-serif max-w-2xl mx-auto lg:text-3xl">
          {"Chapter "}
          {chapter && chapter.number} - {chapter && chapter.title}
        </h2>

        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>
            {chapter && new Date(chapter.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {chapter && (chapter.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className={`p-3 max-w-2xl mx-auto w-full chapter-content ${fontSize} ${fontFamily}`}
          dangerouslySetInnerHTML={{ __html: chapter && chapter.content }}
        ></div>
        <div className="max-w-4xl mx-auto w-full">{/* <CallToAction /> */}</div>
        {/* Comment section  */}
        <CommentSection
          chapterId={chapter && chapter._id}
          novelId={chapter && chapter.novelId}
        />

        {/* recent chapters */}
        {chapters && (
          <div className="flex flex-col gap-4 mt-10">
            <h2 className="text-2xl font-bold">Reading History</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
