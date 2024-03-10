import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ManageNovel from "../components/Novel/ManageNovel";
import ManageChapter from "../components/Chapter/ManageChapter";
import UserProfile from "./UserProfile";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import CreateNovel from "../components/Novel/CreateNovel";
import DashboardComp from "../components/Dashboard/DashboardComp";
import DashboardManagePage from "../components/Dashboard/DashboardManagePage";
import SearchBar from "../components/SearchBar";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { FaBook, FaCog, FaInbox, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
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
  return (
    // <div className="min-h-screen flex flex-col md:flex-row">
    // {/* Sidebar */}
    <div className="flex">
      <DashSidebar className="z-10" />
      <div
        className={`flex flex-col w-full transition-transform duration-200 ease-in-out transform ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        {/* navbar  */}
        <Navbar className=" flex bg-nyanza border-b-2">
          <h1 className="text-2xl">Dashboard</h1>
          {/* Search bar */}
          <SearchBar />
          <div className="flex gap-2 md:order-2">
            {/* Dropdown menu for dashboard, library, settings, and sign out */}
            {currentUser ? (
              <Dropdown
                arrowIcon={true}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/profile"}>
                  <Dropdown.Item icon={FaUser}>My Profile</Dropdown.Item>
                </Link>
                <Link to={"/dashboard?tab=dash"}>
                  <Dropdown.Item icon={HiViewGrid}>
                    Author Dashboard
                  </Dropdown.Item>
                </Link>
                <Link to={"*"}>
                  <Dropdown.Item icon={FaInbox}>Inbox</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link to={"/library"}>
                  <Dropdown.Item icon={FaBook}>Library</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link to={"*"}>
                  <Dropdown.Item icon={FaCog}>Setting</Dropdown.Item>
                </Link>
                <Dropdown.Item
                  icon={FaSignOutAlt}
                  // onClick={handleSignout}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Navbar>
        <div className="bg-white container mx-auto py-8 px-4 content flex-grow">
          {/* dashboard comp */}
          {tab === "dash" && <DashboardComp />}
          {/* users */}
          {tab === "users" && <DashUsers />}
          {/* upload novel  */}
          {tab === "upload" && <CreateNovel />}
          {/* manage novel */}
          {tab === "manage" && <ManageNovel />}
          {/* chapter... */}
          {tab === "chapters" && <DashboardManagePage />}
          {/* comments  */}
          {tab === "comments" && <DashComments />}
        </div>
      </div>
    </div>
  );
}

// {/* Dark mode button */}
//           {/* <Button
//           className="w-12 h-10 hidden sm:inline"
//           color="gray"
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           {theme === "light" ? <FaSun /> : <FaMoon />}
//         </Button> */}
