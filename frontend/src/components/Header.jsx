import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCog,
  FaInbox,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUser,
} from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOut } from "../redux/user/userSlice";
import SearchBar from "./SearchBar";

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

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
    <Navbar className="bg-nyanza border-b-2 sticky top-0 z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Mystic
        </span>
        Codex
      </Link>
      {/* Search bar */}
      <SearchBar />
      <div className="flex gap-2 md:order-2">
        {/* Dark mode button */}
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {/* Dropdown menu for dashboard, library, settings, and sign out */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
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
              <Dropdown.Item icon={HiViewGrid}>Author Dashboard</Dropdown.Item>
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
            <Dropdown.Item icon={FaSignOutAlt} onClick={handleSignout}>
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
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className={path === "/" ? "text-blue-500" : ""}>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className={path === "/about" ? "text-blue-500" : ""}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/novels"} as={"div"}>
          <Link
            to="/novels"
            className={path === "/novels" ? "text-blue-500" : ""}
          >
            Browse
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
