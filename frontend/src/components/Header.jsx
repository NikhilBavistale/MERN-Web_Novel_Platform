import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-300">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-900">Mystic Codex</h1>
        </Link>
        <ul className="flex gap-4 ">
          <Link to="/" className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4">
            <li>Home</li>
          </Link>

          <Link to="/about" className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4">
            <li>About</li>
          </Link>

          <Link to="/sign-in" className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4">
            <li>Login</li>
          </Link>

          <Link to="/sign-up" className="block text-base text-black uppercase cursor-pointer hover:text-white ml-4">
            <li>Register</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
