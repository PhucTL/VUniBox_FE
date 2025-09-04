import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-teal-200 via-blue-400 to-blue-800 text-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-10 mb-6 md:mb-0">
          <a href="#" className="hover:underline text-lg">
            Setting
          </a>
          <a href="#" className="hover:underline text-lg">
            Account
          </a>
          <a href="#" className="hover:underline text-lg">
            Help Center
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#" aria-label="Facebook">
            <FaFacebookF className="w-6 h-6 hover:text-blue-300" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="w-6 h-6 hover:text-pink-300" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn className="w-6 h-6 hover:text-blue-500" />
          </a>
        </div>
      </div>
      <hr className="border-gray-300 mx-8" />
      <div className="text-center py-6 text-white text-lg">
        VinUnibox @ 2025. All rights reserved.
      </div>
    </footer>
  );
}
