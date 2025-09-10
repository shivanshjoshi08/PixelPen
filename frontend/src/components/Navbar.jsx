import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const Navbar = () => {
  const { navigate, token } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
// State to manage mobile menu visibility
  return (
    <nav className="w-full shadow-sm">
      <div className="flex justify-between items-center py-4 px-6 sm:px-12 xl:px-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 object-contain"
            src={assets.pp2}
            alt="logo"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            PixelPen
          </h1>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!token && (
            <button
              onClick={() => navigate("/write-blog")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors"
            >
              <img src={assets.blog_icon} className="w-4 h-4" alt="write" />
              Write a Blog
            </button>
          )}

          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2"
          >
            {token ? "Dashboard" : "Login"}
            <img src={assets.arrow} className="w-3" alt="arrow" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 pb-4">
          {!token && (
            <button
              onClick={() => {
                navigate("/write-blog");
                setIsOpen(false);
              }}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors w-40 justify-center"
            >
              <img src={assets.blog_icon} className="w-4 h-4" alt="write" />
              Write a Blog
            </button>
          )}

          <button
            onClick={() => {
              navigate("/admin");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2 w-40 justify-center"
          >
            {token ? "Dashboard" : "Login"}
            <img src={assets.arrow} className="w-3" alt="arrow" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
