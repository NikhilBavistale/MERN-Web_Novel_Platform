import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const { novelId, chapterId } = useParams();
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  //fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments`);
        let data = await res.json();
        if (res.ok) {
          data = await Promise.all(
            data.map(async (comment) => {
              const novelTitle = await fetchNovelTitle(comment.novelId);
              const chapterTitle = await fetchChapterTitle(
                comment.novelId,
                comment.chapterId
              );
              const targetType = comment.targetType;
              return {
                ...comment,
                novel: { title: novelTitle },
                chapter: { title: chapterTitle },
                targetType,
              };
            })
          );
          setComments(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchComments();
  }, [chapterId, novelId, currentUser._id]);

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
  const fetchChapterTitle = async (novelId, chapterId) => {
    try {
      const response = await fetch(
        `/api/novels/${novelId}/chapters/${chapterId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chapter");
      }
      const chapter = await response.json();
      console.log(chapter.title);

      return chapter.title;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>Comment On</Table.HeadCell>
          {/* <Table.HeadCell>Number of likes</Table.HeadCell> */}
          <Table.HeadCell>Novel Name</Table.HeadCell>
          <Table.HeadCell>Chapter Name</Table.HeadCell>
          <Table.HeadCell>UserId</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {comments.map((comment) => (
          <Table.Body className="divide-y" key={comment._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>
                {new Date(comment.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{comment.content}</Table.Cell>
              <Table.Cell>{comment.targetType}</Table.Cell>
              {/* <Table.Cell>{comment.numberOfLikes}</Table.Cell> */}
              <Table.Cell>{comment.novel.title}</Table.Cell>
              <Table.Cell>
                {comment.chapter.title ? comment.chapter.title : "-"}
              </Table.Cell>
              <Table.Cell>{comment.userId}</Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    setShowModal(true);
                    setCommentIdToDelete(comment._id);
                  }}
                  className="font-medium text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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
}
