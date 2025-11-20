// MinimalSidebar.jsx
import { CiFolderOn, CiStar } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import {
  IoHomeOutline,
  IoLayersOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

export default function MinimalSidebar() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-white bg-opacity-30 font-bold shadow-md' 
        : 'hover:bg-white hover:bg-opacity-20'
    }`;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative
        top-0 left-0
        w-56 min-h-screen
        bg-gradient-to-b from-blue-400 to-cyan-200
        flex flex-col justify-between
        rounded-r-2xl
        transform transition-transform duration-300 ease-in-out
        z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="">
        <nav className="flex flex-col gap-1 px-2">
          <Link to="/" className={getLinkClass('/')} onClick={() => setIsMobileMenuOpen(false)}>
            <IoHomeOutline size={30} /> Trang Chủ
          </Link>
          <Link to="/createproject" className={getLinkClass('/createproject')} onClick={() => setIsMobileMenuOpen(false)}>
            <IoLayersOutline size={30} /> Dự án mới
          </Link>
          <div>
            <button 
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-blue-500/20 rounded-lg text-lg"
            >
              <CiStar size={30} /> 
              <span className="flex-1 text-left">Thư viện</span>
              <svg
                className={`w-4 h-4 transition-transform ${isLibraryOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLibraryOpen && (
              <div className="ml-4 mt-1 flex flex-col gap-1">
                <Link to="/libitem/Book" className={getLinkClass('/libitem/Book')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> Sách
                </Link>
                <Link to="/libitem/Word" className={getLinkClass('/libitem/Word')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> Word
                </Link>
                <Link to="/libitem/Newspaper" className={getLinkClass('/libitem/Newspaper')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> Báo chí
                </Link>
                <Link to="/libitem/PDF" className={getLinkClass('/libitem/PDF')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> PDF
                </Link>
                <Link to="/libitem/Research" className={getLinkClass('/libitem/Research')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> Nghiên cứu
                </Link>
                <Link to="/libitem/Others" className={getLinkClass('/libitem/Others')} onClick={() => setIsMobileMenuOpen(false)}>
                  <CiFolderOn size={30} /> Khác
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/trashdoc" className={getLinkClass('/trashdoc')} onClick={() => setIsMobileMenuOpen(false)}>
            <IoTrashOutline size={30} /> Thùng rác
          </Link>
          <Link to="/alldoc" className={getLinkClass('/alldoc')} onClick={() => setIsMobileMenuOpen(false)}>
            <CiFolderOn size={30} /> Tất cả
          </Link>
          <Link to="/saveddoc" className={getLinkClass('/saveddoc')} onClick={() => setIsMobileMenuOpen(false)}>
            <TfiSave size={30} /> Lưu Trữ
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-blue-300/50 pt-2 flex flex-col gap-1 px-2 mb-4">
        <Link to="/help" className="flex items-center gap-2 px-3 py-1.5 hover:bg-blue-500/20 rounded-lg text-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <GoQuestion className="w-4 h-4" /> Hỗ Trợ
        </Link>
        <Link to="/account" className="flex items-center gap-2 px-3 py-1.5 hover:bg-blue-500/20 rounded-lg text-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <HiOutlineCog6Tooth className="w-4 h-4" /> Cài Đặt
        </Link>
      </div>
    </div>
    </>
  );
}