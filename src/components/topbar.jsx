// Topbar.jsx
import { FaSearch } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-xl font-bold text-blue-700">
          Trích Dẫn và Lưu Trữ
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-blue-600" size={16} />
          <input
            type="text"
            placeholder="Tìm Kiếm"
            className="pl-10 pr-4 py-2 rounded-full border border-blue-400 focus:outline-none"
          />
        </div>
        <button className="px-4 py-2 border border-blue-400 rounded-full text-blue-600 hover:bg-blue-50 flex items-center gap-1">
          Bộ lọc ▼
        </button>
      </div>
    </div>
  );
}
