import React from "react";
import logo from "../assets/logo.png";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/posts/new");
  };

  const handleCreatePostSmall = () => {
    navigate("/posts/new");
    setIsOpen(!isOpen);
  }

  return (
    <nav className="text-gray-800 py-4 px-8 flex justify-between">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="DashBoard" className="h-8" />
        <span className="text-2xl font-bold">Dashboard</span>
      </div>
      <div className="hidden md:flex space-x-6 items-center transition-transform duration-500">
        <Link
          to={`/`}
          className="hover:text-red-500 transition-colors duration-500"
        >
          Home
        </Link>
        <button
          onClick={handleCreatePost}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white transition-colors duration-500"
        >
          Create New Post
        </button>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-16 left-0 w-full h-48 flex flex-col items-center space-y-6 py-8 animate-slideInFromLeft">
          <Link
            to={`/`} onClick={toggleMenu}
            className="hover:text-red-500 transition-colors duration-500"
          >
            Home
          </Link>
          <button
            className=" bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white transition-colors duration-500"
            onClick={handleCreatePostSmall}
          >
            Create New Post
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
