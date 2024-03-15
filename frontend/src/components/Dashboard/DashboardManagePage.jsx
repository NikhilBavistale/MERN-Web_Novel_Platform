import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Spinner } from "flowbite-react";
import Modal from "react-modal";
Modal.setAppElement('#root');
import { Link, useNavigate } from "react-router-dom";
import SortFilterPagination from "../SortFilterPagination";
const getNovelsUrl = (isAdmin, userId, startIndex) => {
  const base = isAdmin ? "/api/novels" : `/api/novels?userId=${userId}`;
  return startIndex !== undefined ? `${base}&startIndex=${startIndex}` : base;
};

const DashboardManagePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [chapters, setChapters] = useState([]);
  const [novels, setNovels] = useState([]);
  const [userNovels, setUserNovels] = useState([]);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [sortOption, setSortOption] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNovels = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          getNovelsUrl(currentUser.isAdmin, currentUser._id)
        );
        if (!res.ok) {
          const message = await res.text();
          setPublishError(message);
          setError(message);
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setPublishError(null);
          setUserNovels(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNovels();
  }, [currentUser._id, currentUser.isAdmin]);

  useEffect(() => {
    if (novels.length > 0) {
      handleNovelSelect(novels[0]);
    }
  }, [novels]);

  const fetchChapters = async (novelId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/novels/${novelId}/chapters`);
      if (!response.ok) {
        throw new Error("Error fetching chapters");
      }
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredNovels = userNovels
    .filter((novel) => {
      if (filterType === "all") {
        return true;
      } else {
        return novel.status === filterType;
      }
    })
    .sort((a, b) => {
      if (
        sortOption === "popular" ||
        sortOption === "recommended" ||
        sortOption === "rating" ||
        sortOption === "updated"
      ) {
        // Handle the sorting logic for these sort types
      } else if (a[sortOption] && b[sortOption]) {
        return a[sortOption].localeCompare(b[sortOption]);
      } else {
        return 0;
      }
    });
  const handleNovelSelect = async (novel) => {
    setLoading(true);
    setSelectedNovel(novel);
    try {
      await fetchChapters(novel._id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching chapters: ", error);
      setSelectedNovel(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (novelId, status) => {
    setLoading(true);
    let newStatus;
    switch (status) {
      case "ongoing":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "paused";
        break;
      case "paused":
        newStatus = "ongoing";
        break;
      default:
        newStatus = "ongoing";
    }
    try {
      const response = await fetch(`/api/novels/update/${novelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating novel status: ", data.message);
        throw new Error(data.message);
      } else {
        // Update the status in the local state
        setNovels(
          novels.map((novel) =>
            novel._id === novelId ? { ...novel, status: newStatus } : novel
          )
        );
      }
    } catch (error) {
      console.error("Error updating novel status: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

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
  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);

  const novelsForCurrentPage = filteredNovels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#f8f9fa",
      border: "1px solid #dee2e6",
      borderRadius: ".25rem",
      padding: "1rem",
      width: "80%",
      maxWidth: "500px",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const closeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  };
  return (
    <div className="p-2 m-1">
      <SortFilterPagination
        filterTerm={filterType}
        setFilterTerm={setFilterType}
        sortOption={sortOption}
        setSortOption={setSortOption}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
      />
      <div className="grid gap-8 my-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4">
        {filteredNovels.length > 0 ? (
          novelsForCurrentPage.slice(0, 6).map((novel, index) => (
            <Card key={index} className="flex flex-col h-full">
              <div className="aspect-w-4 aspect-h-6 cursor-pointer">
                <img
                  src={novel.imageURL}
                  alt={novel.title}
                  className="object-cover w-full h-full"
                  onClick={() => handleNovelSelect(novel)}
                />
              </div>
              {/* Content */}
              <div className="flex-grow flex flex-col gap-1 justify-between p-1">
                <div>
                  <h5
                    className="text-xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => handleNovelSelect(novel)}
                  >
                    {novel.title.length > 10
                      ? novel.title.substring(0, 20) + "..."
                      : novel.title}
                  </h5>
                </div>
                <div className="mt-auto">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      const confirmChange = window.confirm(
                        "Are you sure you want to change the status?"
                      );
                      if (confirmChange) {
                        handleStatusChange(novel._id, novel.status);
                      }
                    }}
                    className={`cursor-pointer ${
                      novel.status === "completed"
                        ? "text-red-500 hover:text-red-700"
                        : novel.status === "paused"
                        ? "text-yellow-500 hover:text-yellow-700"
                        : "text-green-500 hover:text-green-700"
                    }`}
                  >
                    {novel.status.charAt(0).toUpperCase() +
                      novel.status.slice(1)}
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Chapter List"
        appElement={document.getElementById('root')}
      >
        <button style={closeButtonStyle} onClick={() => setIsModalOpen(false)}>
          &times;
        </button>
        <h1 className="text-xl">Chapters</h1>
        {chapters
          .filter((chapter) => chapter.novelId === selectedNovel._id)
          .map((chapter) => (
            <div key={chapter._id} className="p-4 border-b border-gray-200">
              <Link to={`/novels/${selectedNovel._id}/manage`}>
                <h2 className="font-bold text-lg">
                  Chapter {chapter.number}: {chapter.title}
                </h2>
              </Link>
              <div className="flex flex-col gap-5 mt-4 sm:flex-row">
                <Button
                  onClick={() =>
                    navigate(
                      `/update-chapter/${selectedNovel._id}/${chapter._id}`
                    )
                  }
                  gradientDuoTone="purpleToPink"
                  className="flex-1"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    navigate("*");
                  }}
                  gradientDuoTone="purpleToPink"
                  className="flex-1"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    navigate("*");
                  }}
                  gradientDuoTone="purpleToPink"
                  className="flex-1"
                >
                  Publish
                </Button>
              </div>
            </div>
          ))}
      </Modal>
    </div>
  );
};
export default DashboardManagePage;
