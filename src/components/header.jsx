import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="z-10 fixed w-full top-0 right-0 left-0 h-[90px] flex items-center justify-between px-8 bg-gradient-to-r from-white to-[#f5f7fa] shadow-sm ">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/vite.svg" alt="Logo" className="w-20 h-20" />
      </div>

      {/* Menu */}
      <nav className="absolute ml-90 -translate-x-1/2">
        <ul className="flex gap-10 bg-white border border-blue-400 rounded-full py-4 px-12 shadow-md">
          <Link to="/">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
              Home
            </li>
          </Link>
          <Link to="aboutUs">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
              About Us
            </li>
          </Link>
          <Link to="help">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
              Help Center
            </li>
          </Link>
          <Link to="policy">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
              Policy
            </li>
          </Link>
          <Link to="createproject">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
              Project
            </li>
          </Link>
        </ul>
      </nav>

      {/* Account Button */}
      <Link to="/account">
        <div className="flex items-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
            Account
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </header>
  );
}
