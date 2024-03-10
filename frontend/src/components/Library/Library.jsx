import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReadingNow from "./ReadingNow";
import FavoriteNovels from "./FavoriteNovels";
function Library() {
  const [favoriteNovels, setFavoriteNovels] = useState([]);
  const [readingNowNovels, setReadingNowNovels] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  useEffect(() => {
    const fetchFavoriteNovels = async () => {
      try {
        const res = await fetch(`/api/user/${userId}/favorites`);
        const data = await res.json();
        if (res.ok) {
          setFavoriteNovels(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchReadingNowNovels = async () => {
      try {
        const res = await fetch(`/api/user/${userId}/reading`);
        const data = await res.json();
        if (res.ok) {
          setReadingNowNovels(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFavoriteNovels();
    fetchReadingNowNovels();
  }, [userId]);

  return (
    <div className="LibraryPage bg-white p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Library</h1>
      <ReadingNow novels={readingNowNovels} />
      <FavoriteNovels novels={favoriteNovels} />
    </div>
  );
}

export default Library;
