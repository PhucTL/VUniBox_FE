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
    <div className="min-h-screen bg-white flex flex-col mt-20 w-full">
      <div className="px-8 pt-6 pb-2">
        <Topbar />
      </div>
      <div className="flex flex-1 w-full px-8 pb-8 gap-8">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Title + Search */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Thư Viện</h1>
            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="border border-blue-400 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-blue-400 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-4 border-b border-blue-200">Folder</th>
                  <th className="p-4 border-b border-blue-200">Count</th>
                  <th className="p-4 border-b border-blue-200"></th>
                </tr>
              </thead>
              <tbody>
                {currentFolders.map((folder, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => navigate(`/libitem/${folder.name}`)}
                  >
                    <td className="p-4 flex items-center gap-2">
                      <FaRegFolderOpen size={45} /> {folder.name}
                    </td>
                    <td className="p-4">{loading ? "..." : (folderCounts[folder.name] || 0)}</td>
                    <td className="p-4 text-right">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full text-blue-600 disabled:opacity-50"
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
                  className={`w-8 h-8 rounded-full border ${
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
