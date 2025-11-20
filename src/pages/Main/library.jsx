// Library.jsx

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaFolder,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaRegFolderOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import documentService from "../../redux/services/document/documentService";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";

export default function Library() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  const [folderCounts, setFolderCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const result = await documentService.getDocByUserId(userId);
        setFolderCounts(result?.folderCounts || {});
      } catch (e) {
        setFolderCounts({});
      }
      setLoading(false);
    };
    if (userId) {
      run();
    } else {
      setFolderCounts({});
    }
  }, [userId]);

  console.log("Folder Counts:", folderCounts);

  const allFolders = [
    { name: "Book" },
    { name: "Word" },
    { name: "Newspaper" },
    { name: "PDF" },
    { name: "Research" },
    { name: "Others" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allFolders.length / itemsPerPage);
  const currentFolders = allFolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white flex flex-col mt-16 md:mt-20 w-full">
      <div className="px-4 md:px-8 pt-4 md:pt-6 pb-2">
        <Topbar />
      </div>
      <div className="flex flex-col lg:flex-row flex-1 w-full px-4 md:px-8 pb-8 gap-4 lg:gap-8">
        <div className="flex-shrink-0 hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Title + Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Thư Viện</h1>
            <div className="relative w-full md:w-auto">
              <FaSearch className="absolute top-2.5 md:top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="border border-blue-400 rounded-full pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none text-sm md:text-base"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-blue-400 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-2 md:p-4 border-b border-blue-200 text-sm md:text-base">Folder</th>
                  <th className="p-2 md:p-4 border-b border-blue-200 text-sm md:text-base">Count</th>
                  <th className="p-2 md:p-4 border-b border-blue-200 text-sm md:text-base"></th>
                </tr>
              </thead>
              <tbody>
                {currentFolders.map((folder, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => navigate(`/libitem/${folder.name}`)}
                  >
                    <td className="p-2 md:p-4 flex items-center gap-2">
                      <FaRegFolderOpen size={30} className="md:w-[45px] md:h-[45px]" /> 
                      <span className="text-sm md:text-base">{folder.name}</span>
                    </td>
                    <td className="p-2 md:p-4 text-sm md:text-base">{loading ? "..." : (folderCounts[folder.name] || 0)}</td>
                    <td className="p-2 md:p-4 text-right text-sm md:text-base">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 gap-3 sm:gap-0">
            <button
              className="flex items-center gap-2 px-3 md:px-4 py-2 border border-blue-400 rounded-full text-blue-600 disabled:opacity-50 text-sm md:text-base w-full sm:w-auto justify-center"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full border text-sm md:text-base ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "border-blue-400 text-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full text-blue-600 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
