import { Button, Sidebar } from "flowbite-react";
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
    <Sidebar
      className={`duration-75 lg:flex transition-width 
      `}
      aria-label="Sidebar"
      style={{ width: 'auto' }}
    >
      <Sidebar.Items>
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
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
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
  );
}
