import React, { useEffect, useState } from "react";
import NovelCards from "./NovelCards";

const OtherNovels = () => {
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
    <div className="bg-earth-yellow">
      <NovelCards novels={userNovels.slice(9,19)} headline="Other Novels" />
    </div>
  );
};

export default OtherNovels;
