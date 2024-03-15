import DashboardComp from "../components/Dashboard/DashboardComp";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashUsers from "../components/Dashboard/DashUsers";
import CreateNovel from "../components/Novel/CreateNovel";
import ManageNovel from "../components/Novel/ManageNovel";
import DashboardManagePage from "../components/Dashboard/DashboardManagePage";
import DashComments from "../components/Dashboard/DashComments";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashHeader from "../components/Dashboard/DashHeader";
import { useMediaQuery } from "react-responsive";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("dash");
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isSidebarOpen, setSidebarOpen] = useState(isLargeScreen);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col h-screen">
      <DashHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-row flex-grow overflow-hidden">
        <div className="sticky">{isSidebarOpen && <DashSidebar />}</div>
        <div className="flex-grow m-1 p-1 overflow-auto">
          <Breadcrumb
            aria-label="Breadcrumb"
            className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
          >
            <Breadcrumb.Item href="/dashboard" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">{tab}</Breadcrumb.Item>
          </Breadcrumb>
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
};

export default Dashboard;
