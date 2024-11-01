import React from "react";

// image
import Music from "../assets/images/music.svg";

const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 px-4 py-2 border-b-2 bg-gray-800">
        <div className="flex flex-wrap justify-between  items-center">
          <a href="/" className="flex items-center">
            <img
              src={Music}
              className="mr-3 h-6 sm:h-9"
              alt="Music Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Music
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
