import { useState, useEffect } from "react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaEllipsisH,
} from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { useParams } from "react-router-dom";
import documentService from "../../redux/services/document/documentService";

export default function LibItem() {
  const { folderName } = useParams();
  const userId = localStorage.getItem("userId") || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await documentService.getDocByUserIdAndType(
          userId,
          folderName,
          currentPage,
          itemsPerPage
        );
        setItems(result.items || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        setItems([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    fetchData();
  }, [userId, folderName, currentPage, itemsPerPage]);

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
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Thư Viện</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects and files"
                  className="pl-10 pr-4 py-2 border border-blue-400 rounded-full w-64 focus:outline-none"
                />
              </div>
              <button className="p-2">
                <FaEllipsisH className="text-blue-600" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className=" border border-blue-400 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    File name
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Title
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Author's name
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Public year
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Created
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Citation Style
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      Đang tải...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="px-6 py-5 flex items-center gap-3">
                        <FaFileAlt className="text-blue-500 text-2xl" />
                        <span className="text-base">{item.fileName}</span>
                      </td>
                      <td className="px-6 py-5 text-base">{item.title}</td>
                      <td className="px-6 py-5 text-base">{item.author}</td>
                      <td className="px-6 py-5 text-base">{item.publicYear}</td>
                      <td className="px-6 py-5 text-base">{item.created}</td>
                      <td className="px-6 py-5 text-base font-semibold text-blue-600">
                        {item.citationStyle}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <FaEllipsisH className="inline-block text-gray-400 text-xl hover:text-blue-600 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                )}
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
              <FaChevronLeft /> Back
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
