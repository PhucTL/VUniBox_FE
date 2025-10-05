import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { useParams, Link } from "react-router-dom";
import documentService from "../../redux/services/document/documentService";
import citationService from "../../redux/services/citation/citationService";
import toast from 'react-hot-toast';

export default function LibItem() {
  const { folderName } = useParams();
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  

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
        const documents = result?.documents || [];
        const totalCount = result?.totalCount || documents.length;
        setItems(
          documents.map((d) => ({
            id: d.documentId,
            fileName: d.title || d.filePath || "Untitled",
            title: d.title || "",
            created: d.createdAt || "",
            citationStyle: d.citation?.style || "",
            filePath: d.filePath,
            sourceUrl: d.sourceUrl,
          }))
        );
        setTotalPages(Math.max(1, Math.ceil(totalCount / itemsPerPage)));
      } catch (error) {
        setItems([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    if (userId) {
      fetchData();
    } else {
      setItems([]);
      setTotalPages(1);
    }
  }, [userId, folderName, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-white flex flex-col mt-25 w-full">
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
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search file name"
                  className="pl-10 pr-4 py-2 border border-blue-400 rounded-full w-64 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className=" border border-blue-400 rounded-xl overflow-hidden relative">
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
                    Created
                  </th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">
                    Citation
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
                  items.filter(item => item.fileName.toLowerCase().includes(search.toLowerCase())).map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="px-2 py-5 flex items-center gap-3">
                        <Link
                          to={item.filePath || item.sourceUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-blue-700 no-underline hover:text-blue-900"
                        >
                          {item.fileName}
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-base">{item.title}</td>
                      <td className="px-6 py-5 text-base">{item.created}</td>
                      <td className="px-6 py-5 text-base font-semibold text-blue-600">
                        {item.citationStyle}
                        {item.citationStyle && (
                          <button
                            className="ml-3 px-3 py-1.5 rounded border text-blue-600 border-blue-400 hover:bg-blue-50 text-sm"
                            onClick={async () => {
                              try {
                                await citationService.regenerateCitaion({
                                  userId,
                                  documentId: item.id,
                                  citationStyle: item.citationStyle
                                });
                                toast.success('Đã tái tạo trích dẫn!');
                              } catch (err) {
                                toast.error(err?.message || 'Lỗi tái tạo trích dẫn');
                              }
                            }}
                          >
                            Recitation
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-red-600 hover:bg-red-50"
                          onClick={async () => {
                            try {
                              await documentService.trashDocument({ documentId: item.id, userId: Number(userId) });
                            } finally {
                              setCurrentPage(1);
                            }
                          }}
                        >
                          <FaTrash /> Trash
                        </button>
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
