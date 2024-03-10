import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const getNovelsUrl = (isAdmin, userId, startIndex) => {
  const base = isAdmin
    ? "/api/novels"
    : `/api/novels/getnovels?userId=${userId}`;
  return startIndex !== undefined ? `${base}&startIndex=${startIndex}` : base;
};

const ManageNovel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userNovels, setUserNovels] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novelIdToDelete, setNovelIdToDelete] = useState("");
  const [publishError, setPublishError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNovels = async () => {
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
          if ((data.novels || []).length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNovels();
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userNovels.length;
    try {
      const res = await fetch(
        currentUser.isAdmin
          ? `/api/novels?startIndex=${startIndex}`
          : `/api/novels/getnovels?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserNovels((prev) => [...prev, ...(data.novels || [])]);
        if ((data.novels || []).length < 2) {   // Change 2 to 9
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  //delete novel
  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/novels/delete/${novelIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setUserNovels((prev) =>
          prev.filter((novel) => novel._id !== novelIdToDelete)
        );
      }
    } catch (error) {
      setPublishError(error.message);
    }
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
  return (
    <div className="table-auto overflow-x-scroll md:overflow-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {userNovels && userNovels.length > 0 ? (
      <>
        <h2 className="mb-8 text-lg sm:text-xl md:text-2xl font-bold">Manage Your Novel</h2>
        <div className="overflow-x-auto md:overflow-visible">
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>No.</Table.HeadCell>
              <Table.HeadCell>Novel Name</Table.HeadCell>
              <Table.HeadCell>Author Name</Table.HeadCell>
              <Table.HeadCell>Genre</Table.HeadCell>
              <Table.HeadCell>Delete Novel</Table.HeadCell>
              <Table.HeadCell>Edit Novel</Table.HeadCell>
            </Table.Head>

            {userNovels.map((novel, index) => (
              <Table.Body className="divide-y" key={novel._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/novels/${novel._id}/manage`}>
                      {novel.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{novel.authorName}</Table.Cell>
                  <Table.Cell>
                    {novel.genres.map((genre) => genre.name).join(", ") ||
                      "Unknown"}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setNovelIdToDelete(novel._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-novel/${novel._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          </div>

          {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-teal-500 self-center text-sm py-7"
          >
            Show more
          </button>
        )}
      </>
      ) : (
        <p className="text-lg sm:text-xl md:text-2xl">You have no novels yet!</p>
        )}
        {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this novel?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageNovel;
