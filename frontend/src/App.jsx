import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// import AdminRoute from "./components/AdminRoute";
import CreateChapter from "./components/Chapter/CreateChapter";
import UpdateChapter from "./components/Chapter/UpdateChapter";
import SingleNovel from "./components/Novel/SingleNovel";
import NovelList from "./components/Novel/NovelList";
import ChapterPage from "./components/Chapter/ChapterPage";
import CreateNovel from "./components/Novel/CreateNovel";
import UpdateNovel from "./components/Novel/UpdateNovel";
import Library from "./components/Library/Library";
import UserProfile from "./pages/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import ManageChapter from "./components/Chapter/ManageChapter";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ConditionalHeaderFooter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/novels" element={<NovelList />} />
          <Route path="/novels/:novelId" element={<SingleNovel />} />
          <Route
            path="novels/:novelId/chapters/:chapterId"
            element={<ChapterPage />}
          />
          <Route path="/novels/:novelId/manage" element={<ManageChapter />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/create-chapter/:novelId"
              element={<CreateChapter />}
            />
            <Route
              path="/update-chapter/:novelId/:chapterId"
              element={<UpdateChapter />}
            />
            <Route path="/create-novel" element={<CreateNovel />} />
          </Route>
          <Route path="/update-novel/:novelId" element={<UpdateNovel />} />
          {/* <Route element={<AdminRoute />}></Route> */}
        </Routes>
      </ConditionalHeaderFooter>
    </BrowserRouter>
  );
}

function ConditionalHeaderFooter({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <div>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </div>
  );
}
