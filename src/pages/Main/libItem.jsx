import { useState, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
  // Recitation modal state
  const [recitationModal, setRecitationModal] = useState(false);
  const [recitationResultModal, setRecitationResultModal] = useState(false);
  const [selectedRecitation, setSelectedRecitation] = useState("APA");
  const [recitationStyles, setRecitationStyles] = useState([]);
  const [loadingRecitation, setLoadingRecitation] = useState(false);
  const [generatingRecitation, setGeneratingRecitation] = useState(false);
  const [recitationResult, setRecitationResult] = useState(null);
  const [reciteDocId, setReciteDocId] = useState(null);
  // Fetch recitation styles when opening recitation modal
  useEffect(() => {
    const fetchStyles = async () => {
      if (!recitationModal || recitationStyles.length) return;
      setLoadingRecitation(true);
      try {
        const styles = await citationService.getCitationStyle();
        setRecitationStyles(styles || []);
        if (styles && styles.length) {
          const hasSelected = styles.some((s) => (s.style || s.id) === selectedRecitation);
          if (!hasSelected) setSelectedRecitation(styles[0].style || styles[0].id);
        }
      } catch (e) {
        // silent
      }
      setLoadingRecitation(false);
    };
    fetchStyles();
  }, [recitationModal]);
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
                      </td>
                      <td className="px-6 py-5 text-right flex gap-2 justify-end">
                        <button
                          className="px-3 py-1.5 rounded border text-blue-600 border-blue-400 hover:bg-blue-50 text-sm"
                          onClick={() => {
                            setReciteDocId(item.id);
                            setRecitationModal(true);
                          }}
                        >
                          Recitation
                        </button>
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
      {/* Recitation Modal */}
      {recitationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] border border-blue-100 relative animate-fadeIn">
            <button
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
              onClick={() => setRecitationModal(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Chọn Kiểu Trích Dẫn</h3>
                <p className="text-gray-500">Chọn định dạng trích dẫn phù hợp cho tài liệu của bạn</p>
              </div>
              {loadingRecitation && (
                <div className="text-center text-gray-500">Đang tải kiểu trích dẫn...</div>
              )}
              {!recitationStyles.length && !loadingRecitation && (
                <div className="text-center text-gray-500">Không có kiểu trích dẫn để hiển thị</div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {recitationStyles.map((type) => (
                  <div
                    key={type.style || type.id}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedRecitation === (type.style || type.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedRecitation(type.style || type.id)}
                  >
                    <h4 className="font-bold text-lg text-blue-600">{type.style}</h4>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={async () => {
                    if (!reciteDocId) {
                      toast.error("Không tìm thấy documentId.");
                      return;
                    }
                    try {
                      setGeneratingRecitation(true);
                      const res = await citationService.regenerateCitaion({
                        userId,
                        documentId: reciteDocId,
                        newCitationStyle: selectedRecitation
                      });
                      if (res?.result) {
                        setRecitationResult(res.result);
                        setRecitationResultModal(true);
                        setRecitationModal(false);
                      }
                    } catch (e) {
                      toast.error(e?.message || "Tái tạo trích dẫn thất bại");
                    } finally {
                      setGeneratingRecitation(false);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                >
                  {generatingRecitation ? "Đang tái tạo..." : "Tái tạo"}
                </button>
                <button
                  onClick={() => setRecitationModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Recitation Result Modal */}
      {recitationResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] border border-blue-100 relative animate-fadeIn">
            <button
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
              onClick={() => setRecitationResultModal(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Kết quả trích dẫn</h3>
                <p className="text-gray-500">Bạn có thể sao chép và sử dụng các trích dẫn sau</p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Kiểu trích dẫn:</span>
                    <span className="text-blue-600">{recitationResult?.style}</span>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-lg p-3 pr-10 border border-gray-200 hover:border-blue-300 transition-colors">
                      {recitationResult?.formattedCitation}
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(recitationResult?.formattedCitation);
                          toast.success('Đã sao chép trích dẫn!');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FaClipboard />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Trích dẫn trong văn bản:</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(recitationResult?.inTextCitation);
                        toast.success('Đã sao chép trích dẫn!');
                      }}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                    >
                      <FaClipboard />
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                    {recitationResult?.inTextCitation}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setRecitationResultModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 font-semibold"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
