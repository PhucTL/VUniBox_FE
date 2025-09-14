// Sidebar.jsx
import { CiFolderOn, CiStar } from "react-icons/ci";
import { FaQuestionCircle, FaCog } from "react-icons/fa";
import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoLayersOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-80 min-h-screen bg-gradient-to-b from-blue-400 to-cyan-200 p-4 flex flex-col justify-between rounded-4xl shadow-lg">
      <div>
        <nav className="flex flex-col gap-4 mt-5">
          <a href="#" className="flex items-center gap-2">
            <IoHomeOutline size={30} /> Trang Chủ
          </a>
          <div>
            <Link to="/library" className="flex items-center gap-2 relative">
              <CiStar size={30} /> Lưu Trữ
            </Link>
            <div className="ml-8 mt-2 flex flex-col gap-2">
              <Link to="/libitem/Book" className="flex items-center gap-2">
                <CiFolderOn size={30} /> Book
              </Link>
              <Link to="/libitem/Word" className="flex items-center gap-2">
                <CiFolderOn size={30} /> Word
              </Link>
              <Link to="/libitem/Newspaper" className="flex items-center gap-2">
                <CiFolderOn size={30} /> Newspaper
              </Link>
              <Link to="/libitem/PDF" className="flex items-center gap-2 ">
                <CiFolderOn size={30} /> PDF
              </Link>
              <Link to="/libitem/Article" className="flex items-center gap-2 ">
                <CiFolderOn size={30} /> Article
              </Link>
              <Link to="/libitem/Research" className="flex items-center gap-2 ">
                <CiFolderOn size={30} /> Research
              </Link>
              <Link to="/libitem/Others" className="flex items-center gap-2 ">
                <CiFolderOn size={30} /> Others
              </Link>
            </div>
          </div>
          <Link to="/createproject" className="flex items-center gap-2">
            <IoLayersOutline size={30} /> Dự Án mới
          </Link>
          <a href="#" className="flex items-center gap-2">
            <IoDocumentTextOutline size={30} /> Tài Liệu
          </a>
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-400 pt-4 flex flex-col gap-3">
        <a href="#" className="flex items-center gap-2">
          <FaQuestionCircle size={30} /> Hỗ Trợ
        </a>
        <a href="#" className="flex items-center gap-2">
          <FaCog size={30} /> Cài Đặt
        </a>
      </div>
    </div>
  );
}
