import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/thunks/auth";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user data from Redux
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await dispatch(logoutThunk());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="z-10 fixed w-full top-0 right-0 left-0 h-[70px] md:h-[90px] flex items-center justify-between px-4 md:px-8 bg-gradient-to-r from-white to-[#f5f7fa] shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-20 h-14 md:w-25 md:h-20" />
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex items-center justify-center w-10 h-10 text-blue-700"
        onClick={toggleMobileMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
        </svg>
      </button>

      {/* Desktop Menu */}
      <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <ul className="flex gap-6 lg:gap-10 bg-white border border-blue-400 rounded-full py-3 px-8 lg:py-4 lg:px-12 shadow-md">
          <Link to="/">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 text-sm lg:text-base whitespace-nowrap">
              Trang chủ
            </li>
          </Link>
          <Link to="aboutUs">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 text-sm lg:text-base whitespace-nowrap">
              Chúng tôi
            </li>
          </Link>
          <Link to="help">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 text-sm lg:text-base whitespace-nowrap">
              Liên hệ
            </li>
          </Link>
          <Link to="policy">
            <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 text-sm lg:text-base whitespace-nowrap">
            Chính sách
            </li>
          </Link>
          {isAuthenticated && (
            <Link to="createproject">
              <li className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 text-sm lg:text-base whitespace-nowrap">
                Dự án
              </li>
            </Link>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <ul className="flex flex-col py-2">
            <Link to="/" onClick={toggleMobileMenu}>
              <li className="text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50">
                Trang chủ
              </li>
            </Link>
            <Link to="aboutUs" onClick={toggleMobileMenu}>
              <li className="text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50">
                Chúng tôi
              </li>
            </Link>
            <Link to="help" onClick={toggleMobileMenu}>
              <li className="text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50">
                Liên hệ
              </li>
            </Link>
            <Link to="policy" onClick={toggleMobileMenu}>
              <li className="text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50">
                Chính sách
              </li>
            </Link>
            {isAuthenticated && (
              <Link to="createproject" onClick={toggleMobileMenu}>
                <li className="text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50">
                  Dự án
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}

      {/* Account Button with Dropdown */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        {isAuthenticated ? (
          <>
            {/* Account Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-4 lg:px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform text-sm lg:text-base"
            >
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
              {user?.fullName || 'Account'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/account"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    My Profile
                  </Link>


                  <hr className="my-1 border-gray-100" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-4 lg:px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform text-sm lg:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                />
              </svg>
              Login
            </div>
          </Link>
        )}
      </div>

      {/* Mobile Account Section */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 mt-[300px]">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.fullName || 'User'}</p>
            <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          <Link to="/account" onClick={toggleMobileMenu} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            My Profile
          </Link>
          <hr className="border-gray-100" />
          <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Log Out
          </button>
        </div>
      )}
      {isMobileMenuOpen && !isAuthenticated && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 mt-[230px]">
          <Link to="/login" onClick={toggleMobileMenu} className="flex items-center justify-center px-4 py-4 text-white bg-gradient-to-r from-blue-500 to-cyan-400 m-4 rounded-full font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
            </svg>
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
