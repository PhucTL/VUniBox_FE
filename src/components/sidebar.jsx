// Sidebar.jsx
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

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const isLibItemActive = () => {
    return location.pathname.startsWith('/libitem/');
  };

  const getLinkClass = (path) => {
    return `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive(path) 
        ? 'bg-white bg-opacity-30 font-bold shadow-md' 
        : 'hover:bg-white hover:bg-opacity-20'
    }`;
  };

  return (
    <div className="w-80 min-h-screen bg-gradient-to-b from-blue-400 to-cyan-200 p-4 flex flex-col justify-between rounded-4xl shadow-lg">
      <div>
        <nav className="flex flex-col gap-4 mt-5">
          <Link to="/" className={getLinkClass('/')}>
            <IoHomeOutline size={30} />  Trang Chủ
          </Link>
          <Link to="/createproject" className={getLinkClass('/createproject')}>
            <IoLayersOutline size={30} /> Dự án mới
          </Link>
          <div>
            <Link to="/library" className={getLinkClass('/library')}>
              <CiStar size={30} /> Thư viện
            </Link>
            <div className="ml-8 mt-2 flex flex-col gap-2">
              <Link to="/libitem/Book" className={getLinkClass('/libitem/Book')}>
                <CiFolderOn size={30} /> Sách
              </Link>
              <Link to="/libitem/Word" className={getLinkClass('/libitem/Word')}>
                <CiFolderOn size={30} /> Word
              </Link>
              <Link to="/libitem/Newspaper" className={getLinkClass('/libitem/Newspaper')}>
                <CiFolderOn size={30} /> Báo chí
              </Link>
              <Link to="/libitem/PDF" className={getLinkClass('/libitem/PDF')}>
                <CiFolderOn size={30} /> PDF
              </Link>
              <Link to="/libitem/Research" className={getLinkClass('/libitem/Research')}>
                <CiFolderOn size={30} /> Nghiên cứu
              </Link>
              <Link to="/libitem/Others" className={getLinkClass('/libitem/Others')}>
                <CiFolderOn size={30} /> Khác
              </Link>
            </div>
          </div>
          <Link to="/trashdoc" className={getLinkClass('/trashdoc')}>
            <IoTrashOutline  size={30} /> Thùng rác
          </Link>
          <Link to="/alldoc" className={getLinkClass('/alldoc')}>
            <CiFolderOn  size={30} /> Tất cả
          </Link>
          <Link to="/saveddoc" className={getLinkClass('/saveddoc')}>
            <TfiSave  size={25} /> Lưu trữ
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-400 pt-4 flex flex-col gap-3">
        <Link to="/help" className={getLinkClass('/help')}>
          <GoQuestion  size={30} /> Hỗ Trợ
        </Link>
        <Link to="/account" className={getLinkClass('/account')}>
          <HiOutlineCog6Tooth  size={30} /> Cài Đặt
        </Link>
      </div>
    </div>
  );
}
