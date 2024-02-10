import React, { useEffect, useState } from "react";
import NovelCards from "./NovelCards";
const FeaturedNovels = () => {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetch("api/novels/")
      .then((res) => res.json())
      .then((data) => setNovels(data.slice(0, 10)));
  }, []);

  return (
    <div>
      <NovelCards novels={novels} headline="Featured Novels" />
    </div>
  );
};

export default FeaturedNovels;
