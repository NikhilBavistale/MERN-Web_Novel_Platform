import React, { useState, useEffect } from "react";

function Library() {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    fetchUserLibrary();
  }, []);

  const fetchUserLibrary = async () => {
    try {
      const response = await fetch("/api/libraries/getlibraries");
      if (!response.ok) {
        throw new Error("Failed to fetch user library");
      }
      const data = await response.json();
      setLibraries(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFavoriteToggle = async (novelId) => {
    try {
      const response = await fetch(`/api/libraries/favorite/${novelId}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to add novel to favorites");
      }
      fetchUserLibrary();
    } catch (error) {
      console.error("Error adding novel to favorites:", error);
    }
  };
  const handleReadingNowToggle = async (novelId) => {
    try {
      const response = await fetch(`/api/libraries/add/${novelId}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to add novel to reading now");
      }
      fetchUserLibrary();
    } catch (error) {
      console.error("Error adding novel to reading now:", error);
    }
  };

  const favoriteNovels = libraries.filter((library) => library.isFavorite);
  const readingNovels = libraries.filter((library) => library.isReadingNow);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Library</h1>
      <h2 className="text-2xl font-bold mb-4">Favorite Novels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {libraries.map((library) => (
          <div
            key={library._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={library.novelId.imageURL}
              alt={library.novelId.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{library.novelId.title}</h2>
              <p className="text-gray-600">
                Author: {library.novelId.authorName}
              </p>
              <p className="text-gray-600">
                Genre: {library.novelId.genres.join(", ")}
              </p>
              <p className="text-gray-600">Status: {library.novelId.status}</p>
              <p className="text-gray-600">Bookmark: {library.bookmark}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Currently Reading</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {readingNovels.map((library) => (
          <div
            key={library._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={library.novelId.imageURL}
              alt={library.novelId.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{library.novelId.title}</h2>
              <p className="text-gray-600">
                Author: {library.novelId.authorName}
              </p>
              <p className="text-gray-600">Bookmark: {library.bookmark}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
