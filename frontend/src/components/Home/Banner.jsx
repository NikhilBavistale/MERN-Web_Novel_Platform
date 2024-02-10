import React from "react";
import BannerCard from "./BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex flex-col md:flex-row items-center">
      <div className="flex flex-col w-full md:flex-row justify-between items-center gap-12 py-40">
        {/* left side */}
        <div className="space-y-8 h-full md:w-1/2">
          <h2 className="text-4xl font-bold leading-snug text-black">
            {/* Create Your Own Novels */}
            The ultimate web novel platform{" "}
            <span className="text-blue-700">
              {/* Or Read From Best Featured */}
              for storytellers and readers alike
            </span>
          </h2>
          <p className="md:w-4/5">
            At Mystic Codex, we believe in the power of storytelling to inspire,
            entertain, and unite people from all walks of life. Our digital
            oasis provides a haven where writers can unleash their creativity
            and readers can indulge in their love for literature. With a diverse
            range of genres and styles, our platform fosters a community of
            boundless imagination and endless inspiration.
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a novel"
              className="py-2 px-2 rounded-s-sm outline-none"
            />
            <button className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200">
              Search
            </button>
          </div>
        </div>

        {/* right side */}
        <div className="mt-4 md:mt-0">
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;