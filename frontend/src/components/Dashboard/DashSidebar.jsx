import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiX,
  HiMenu,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <button onClick={handleToggle} className="md:hidden p-2">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>
      <Sidebar
      className={`fixed w-full md:w-56 overflow-auto transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 bg-nyanza`}
      >
        
        <Sidebar.Items>
        <Link
        to="/"
        className="whitespace-nowrap text-3xl sm:text-3xl font-semibold dark:text-white"
        // className="self-center whitespace-nowrap text-3xl sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Mystic
        </span>
        Codex
      </Link>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                {currentUser.isAdmin ? "Admin Dashboard" : "Author Dashboard"}
              </Sidebar.Item>
            </Link>

            {currentUser.isAdmin && (
              <>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item
                    active={tab === "users"}
                    icon={HiOutlineUserGroup}
                    label={currentUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    as="div"
                  >
                    Users
                  </Sidebar.Item>
                </Link>
              </>
            )}
            <Link to="/dashboard?tab=upload">
              <Sidebar.Item
                active={tab === "upload"}
                icon={HiOutlineCloudUpload}
                as="div"
              >
                Write Novel
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=manage">
              <Sidebar.Item active={tab === "manage"} icon={HiInbox} as="div">
                My Novels
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=chapters">
              <Sidebar.Item
                active={tab === "chapters"}
                icon={HiDocumentText}
                as="div"
              >
                Manage Chapters
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                icon={HiAnnotation}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>

            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer mt-auto"
              onClick={handleSignout}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
