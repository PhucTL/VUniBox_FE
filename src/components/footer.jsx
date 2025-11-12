import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  return (
    <footer className="w-screen bg-gradient-to-b from-teal-200 via-blue-400 to-blue-800 text-white border-t border-gray-300 z-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="w-full px-8 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex text-lg space-x-10 mb-6 md:mb-0 hover:underline">
          {isAuthenticated ? (
              <Link to="/account">Account</Link>
            ) : (
              <Link to="/login">Account</Link>
            )}
          <a href="/help" className="hover:underline text-lg">
            Help Center
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.facebook.com/VUniBox" aria-label="Facebook">
            <FaFacebookF className="w-6 h-6 hover:text-cyan-300" />
          </a>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="text-center py-6 text-white text-lg">
        VUnibox @ 2025. All rights reserved.
      </div>
    </footer>
  );
}
