import React, { useEffect, useState } from "react";
import NovelCards from "./NovelCards";
const FeaturedNovels = () => {
  const [userNovels, setUserNovels] = useState([]);

  useEffect(() => {
    const fetchAllNovels = async () => {
      try {
        const res = await fetch(`/api/novels`);
        const data = await res.json();
        if (res.ok) {
          setUserNovels(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllNovels();
  }, []);

  return (
    <div className="bg-mindaro p-4 md:p-8">
      <NovelCards novels={userNovels.slice(0,8)} headline="Featured Novels" />
    </div>
  );
};

export default FeaturedNovels;
