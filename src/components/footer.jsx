import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  return (
    <footer className="w-screen bg-gradient-to-b from-teal-200 via-blue-400 to-blue-800 text-white border-t border-gray-300 z-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="w-full px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row text-sm md:text-lg space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-10 mb-4 md:mb-0 text-center sm:text-left">
          {isAuthenticated ? (
              <Link to="/account" className="hover:underline">Account</Link>
            ) : (
              <Link to="/login" className="hover:underline">Account</Link>
            )}
          <a href="/help" className="hover:underline">
            Help Center
          </a>
        </div>
        <div className="flex space-x-4 md:space-x-6">
          <a href="https://www.facebook.com/VUniBox" aria-label="Facebook">
            <FaFacebookF className="w-6 h-6 hover:text-cyan-300" />
          </a>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="text-center py-4 md:py-6 text-white text-sm md:text-lg">
        VUnibox @ 2025. All rights reserved.
      </div>
    </footer>
  );
}
