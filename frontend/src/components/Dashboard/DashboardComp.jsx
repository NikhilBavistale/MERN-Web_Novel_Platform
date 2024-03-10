import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiBookOpen,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [novels, setNovels] = useState([]);
  const [comments, setComments] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthNovels, setLastMonthNovels] = useState(0);
  const [lastMonthChapters, setLastMonthChapters] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=3");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchNovels = async () => {
      try {
        const res = await fetch(`/api/novels/getnovels`);
        if (!res.ok) {
          const message = await res.text();
          setPublishError(message);
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setPublishError(null);
          setNovels(data);
          setLastMonthNovels(data.lastMonthNovels);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchAllChapters = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}/chapters`);
        const data = await res.json();
        if (res.ok) {
          setChapters(data);
          setLastMonthChapters(data.lastMonthChapters);
        }
      } catch (error) {}
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
    }
    fetchNovels();
    fetchAllChapters();
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {currentUser.isAdmin ? (
          // total user count and last month joined
          <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
        ) : (
          // total novels count and last month added
          <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">
                  Total Novels
                </h3>
                <p className="text-2xl">{novels.length}</p>
              </div>
              <HiBookOpen className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthNovels}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
        )}

        {/* total comments count and last month added */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/* total chapters count and last month added */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Chapters
              </h3>
              <p className="text-2xl">{chapters.length}</p>
            </div>
            <HiDocumentText className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthChapters}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      {/* Recent users, novels, comments, chapters */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {currentUser.isAdmin ? (
        // Recent users
          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between  p-3 text-sm font-semibold">
              <h1 className="text-center p-2">Recent users</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={"/dashboard?tab=users"}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt="user"
                          className="w-10 h-10 rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        ) : (
        // Recent novels
          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between  p-3 text-sm font-semibold">
              <h1 className="text-center p-2">Recent novels</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={"/dashboard?tab=manage"}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Novel image</Table.HeadCell>
                <Table.HeadCell>Novel Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {novels &&
                novels.slice(0, 4).map((novel) => (
                  <Table.Body key={novel._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={novel.imageURL}
                          alt="user"
                          className="w-14 h-10 rounded-md bg-gray-500 object-cover"
                        />
                      </Table.Cell>
                      <Table.Cell className="w-96">{novel.title}</Table.Cell>
                      <Table.Cell className="w-5">{novel.genre}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        )}
        {/* Recent Comments  */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.slice(0, 5).map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        {/* Recent Chapter  */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent chapters</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=chapters"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Chapter Title</Table.HeadCell>
              <Table.HeadCell>Novel Title</Table.HeadCell>
              <Table.HeadCell>Published Date</Table.HeadCell>
            </Table.Head>
            {chapters &&
              chapters.slice(0, 4).map((chapter) => (
                <Table.Body key={chapter._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">{chapter.title}</Table.Cell>
                    <Table.Cell className="w-96">
                      {chapter.novelId?.title || "Unknown"}
                    </Table.Cell>
                    <Table.Cell className="w-48">
                      {new Date(chapter.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
