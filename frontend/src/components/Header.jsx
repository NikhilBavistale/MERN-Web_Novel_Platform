import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-300 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center mx-auto p-3 md:px-8 lg:px-16">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-900">Mystic Codex</h1>
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          Menu
        </button>
        <ul className={`flex gap-4 ${isOpen ? "" : "hidden"} md:flex`}>
          <Link
            to="/"
            className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4"
          >
            <li>Home</li>
          </Link>

          <Link
            to="/about"
            className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4"
          >
            <li>About</li>
          </Link>

          <Link
            to={currentUser ? "/profile" : "/sign-in"}
            className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4"
          >
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 object-cover rounded-full"
              />
            ) : (
              <li>Login</li>
            )}
          </Link>

          {!currentUser && (
            <Link
              to="/sign-up"
              className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4"
            >
              <li>Register</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
