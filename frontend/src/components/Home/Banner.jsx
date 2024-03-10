import React, { useState } from "react";
import BannerCard from "./BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-light-yellow dark:bg-yellow-700 flex flex-col md:flex-row items-center">
      <div className="flex flex-col w-full md:flex-row justify-between items-center gap-12 py-10">
        {/* left side */}
        <div className="space-y-8 h-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug text-black">
            The ultimate web novel platform{" "}
            <span className="text-blue-700">
              for storytellers and readers alike
            </span>
          </h2>
          <p className="md:w-4/5 text-lg md:text-xl">
            At Mystic Codex, we believe in the power of storytelling to inspire,
            entertain, and unite people from all walks of life. Our digital
            oasis provides a haven where writers can unleash their creativity
            and readers can indulge in their love for literature. With a diverse
            range of genres and styles, our platform fosters a community of
            boundless imagination and endless inspiration.
          </p>
        </div>

        {/* right side */}
        <div className="m-4">
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
