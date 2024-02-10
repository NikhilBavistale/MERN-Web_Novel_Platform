import React from "react";
import Banner from "../components/Home/Banner";
import FeaturedNovels from "../components/Home/FeaturedNovels";
import FavNovel from "../components/Home/FavNovel";
import OtherNovels from "../components/Home/OtherNovels";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedNovels />
      <FavNovel />
      <OtherNovels />
    </div>
  );
}
