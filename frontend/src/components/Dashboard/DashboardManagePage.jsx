import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Pagination, Select, Spinner } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DashboardManagePage = () => {
  const { novelId, chapterId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [chapters, setChapters] = useState([]);
  const [novels, setNovels] = useState([]);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await fetch("/api/novels/getNovels");
        const data = await response.json();
        setNovels(data);
      } catch (error) {
        console.error("Error fetching novels: ", error);
      }
    };

    fetchNovels();
  }, []);

  const fetchChapters = async (novelId) => {
    try {
      const response = await fetch(`/api/novels/${novelId}/chapters`);
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovelSelect = (novel) => {
    setSelectedNovel(novel);
    fetchChapters(novel._id);
    setLoading(true);
  };
  const handleStatusChange = async (novelId, status) => {
    const completed = status === "completed";
    try {
      const response = await fetch(`/api/novels/update/${novelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating novel status: ", data.message);
      } else {
        // Update the status in the local state
        setNovels(
          novels.map((novel) =>
            novel._id === novelId ? { ...novel, completed } : novel
          )
        );
      }
    } catch (error) {
      console.error("Error updating novel status: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Novels list on the left */}
      <div className="w-full md:w-1/3 p-4">
        {novels.map((novel) => (
          <div
            key={novel._id}
            className="rounded overflow-hidden shadow-lg p-3 m-4 bg-white dark:bg-gray-800"
          >
            <h3
              className="font-bold text-xl mb-2 cursor-pointer"
              onClick={() => handleNovelSelect(novel)}
            >
              {novel.title}
            </h3>
            
            <Link
              onClick={(e) => {
                e.preventDefault();
                const confirmChange = window.confirm(
                  "Are you sure you want to change the status?"
                );
                if (confirmChange) {
                  handleStatusChange(
                    novel._id,
                    novel.completed ? "in-progress" : "completed"
                  );
                }
              }}
              className={novel.completed ? "text-green-500" : "text-red-500 cursor-pointer"}
            >
              {novel.completed ? "Completed" : "Ongoing"}
            </Link>
          </div>
        ))}
      </div>

      {/* Chapters list on the right */}
      <div className="w-full md:w-2/3 p-4">
        {selectedNovel &&
          chapters
            .filter((chapter) => chapter.novelId === selectedNovel._id)
            .map((chapter) => (
              <div
                key={chapter._id}
                className="rounded overflow-hidden shadow-lg p-6 m-2 bg-white dark:bg-gray-800"
              >
                {/* add chapter number  */}
                <p>Chapter: {chapter.number}</p>

                <h3 className="font-bold text-xl mb-2">{chapter.title}</h3>
                <div className="mt-4 flex flex-wrap gap-5">
                  <Button
                    onClick={() =>
                      navigate(
                        `/update-chapter/${selectedNovel._id}/${chapter._id}`
                      )
                    }
                    gradientDuoTone="purpleToPink"
                  >
                    Update
                  </Button>
                  <Button
                    gradientDuoTone="purpleToPink"
                    onClick={() => {
                      navigate("*");
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    gradientDuoTone="purpleToPink"
                    onClick={() => {
                      navigate("*");
                    }}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default DashboardManagePage;
