import React from "react";
import { Link } from "react-router-dom";
import FavImage from "../../assets/favouritenovel.jpg";
const FavNovel = () => {
  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-24">
      <div className="md:w-1/2">
        <img src={FavImage} alt="favouritebook" className="rounded md-10/12" />
      </div>

      <div className="md:w-1/2 space-y-6">
        <h2 className="text-5xl font-bold my-5 md:w-3/4 leading-snug">
          Find Your Favourite <span className="text-blue-700">Book Here!</span>
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          Dive into an expansive library that caters to readers of all tastes
          and preferences. Our collection spans a multitude of genres and
          themes, ensuring there's something for everyone. Discover captivating
          stories, explore new narratives, and connect with talented authors who
          will transport you to different worlds with every click.
        </p>

        {/* statistics */}
        <div className="flex flex-col sm:flex-row  justify-between gap-6 md:w-3/4 my-14">
          <div>
            <h3 className="text-3xl font-bold">800+</h3>
            <p className="text-base">Book Listing</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-base">Registered Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-base">Daily Novel Updates</p>
          </div>
        </div>

        <Link to="/novels" className="mt-12 block">
          <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
            Expolre More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavNovel;
