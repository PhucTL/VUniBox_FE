import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaPen, FaChevronDown, FaTrash, FaChevronLeft, FaChevronRight, FaClipboard } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import documentService from "../../redux/services/document/documentService";
import { Link } from "react-router-dom";
import citationService from "../../redux/services/citation/citationService";
import toast from 'react-hot-toast';
import { MdOutlineFileOpen } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";

export default function AllDoc() {
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState("");
  const [citationModal, setCitationModal] = useState(false);
  const [citationResultModal, setCitationResultModal] = useState(false);
  const [citationStyles, setCitationStyles] = useState([]);
  const [loadingCitations, setLoadingCitations] = useState(false);
  const [reGeneratingCitation, setreGeneratingCitation] = useState(false);
  const [citationResult, setCitationResult] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [sortByAuthor, setSortByAuthor] = useState(false);
  const [updateData, setUpdateData] = useState({
    documentId: null,
    userId: userId,
    title: "",
    year: "",
    author: "",
    publisher: "",
    doi: ""
  });
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await documentService.getDocAllByUserId(Number(userId), filterStatus, filterType);
        const documents = result?.allDocuments || result?.documents || result || [];
        setItems(
          documents.map((d) => ({
            id: d.documentId,
            fileName: d.title || d.filePath || "Untitled",
            source: d.source || "",
            created: d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-GB') : "",
            citationStyle: d.citationStyle || "",
            abstract: d.abstract || "",
            filePath: d.filePath,
            sourceUrl: d.sourceUrl,
            formattedCitation: d.formattedCitation || "",
            publicationDate: d.publicationDate || "",
            author: d.author || "",
            doi: d.doi || ""
          }))
        );
      } catch (error) {
        setItems([]);
      }
      setLoading(false);
    };
    if (userId) {
      fetchData();
    } else {
      setItems([]);
    }
  }, [userId, filterStatus, filterType]);
  useEffect(() => {
    const fetchStyles = async () => {
      if (!citationModal || citationStyles.length) return;
      setLoadingCitations(true);
      try {
        const styles = await citationService.getCitationStyle();
        setCitationStyles(styles || []);
        if (styles && styles.length) {
          const hasSelected = styles.some((s) => (s.style || s.id) === selectedCitation);
          if (!hasSelected) {
            setSelectedCitation(styles[0].style || styles[0].id);
          }
        }
      } catch (e) {
        console.error("Failed to load citation styles", e);
      }
      setLoadingCitations(false);
    };
    fetchStyles();
  }, [citationModal]);

  const filteredItems = items.filter((item) =>
    item.fileName.toLowerCase().includes(search.toLowerCase())
  );

  // Sort items by author if sortByAuthor is true
  const sortedItems = sortByAuthor 
    ? [...filteredItems].sort((a, b) => {
        const authorA = a.author || '';
        const authorB = b.author || '';
        
        // If both have authors, sort alphabetically
        if (authorA && authorB) {
          return authorA.toLowerCase().localeCompare(authorB.toLowerCase());
        }
        // If only A has author, A comes first
        if (authorA && !authorB) {
          return -1;
        }
        // If only B has author, B comes first
        if (!authorA && authorB) {
          return 1;
        }
        // If neither has author, maintain original order
        return 0;
      })
    : filteredItems;

  // Pagination logic
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, filterType, sortByAuthor]);

  return (
    <div className="min-h-screen bg-white flex flex-col mt-25 w-full">
      <div className="flex flex-1 w-full px-8 pb-8 gap-8">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Tất cả tài liệu</h1>
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
              <div className="flex gap-4">
                <div className="relative">
                  <div className="relative inline-block">
                    <select 
                      value={filterStatus} 
                      onChange={e => setFilterStatus(e.target.value)} 
                      className="appearance-none border border-blue-400 rounded-full px-4 py-2 pr-8 text-blue-600 bg-white focus:outline-none focus:border-blue-500"
                      style={{
                        borderRadius: "9999px",
                        WebkitAppearance: "none",
                        MozAppearance: "none"
                      }}
                    >
                      <option value="" className="rounded-lg py-2">Tất cả</option>
                      <option value="saved" className="rounded-lg py-2">Đã lưu</option>
                      <option value="trash" className="rounded-lg py-2">Thùng rác</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
                      <FaChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={filterType} 
                    onChange={e => setFilterType(e.target.value)} 
                    placeholder="Loại tài liệu" 
                    className="border border-blue-400 rounded-full px-4 py-2 text-blue-600 w-40 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border border-blue-400 rounded-xl overflow-visible relative min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[180px]">Tên File</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[120px]">
                    <button
                      onClick={() => setSortByAuthor(!sortByAuthor)}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      Tác giả
                      {sortByAuthor ? (
                        <span className="text-blue-600">↓</span>
                      ) : (
                        <span className="text-gray-400">↕</span>
                      )}
                    </button>
                  </th>
                  <th className="px-2 py-5 border-b border-blue-200 text-sm w-[150px]">Năm xuất bản</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[140px]">Nguồn</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[100px]">Ngày tạo</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[100px]">Kiểu trích</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[150px]">Lưu ý</th>
                  <th className="px-4 py-5 border-b border-blue-200 text-sm w-[80px]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center pt-30 text-lg">Đang tải...</td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center pt-30 text-lg">Không có dữ liệu</td>
                  </tr>
                ) : (
                  currentItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 ">
                      <td className="px-2 py-3 w-[180px]">
                        <Link
                          to={item.filePath || item.sourceUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 no-underline hover:text-blue-900 line-clamp-2"
                        >
                          {item.fileName}
                        </Link>
                      </td>
                      <td className="px-2 py-5 text-xs w-[120px] truncate" title={item.author}>{item.author}</td>
                      <td className="px-2 py-5 text-xs w-[100px]">{item.publicationDate}</td>
                      <td className="px-2 py-5 text-xs w-[140px] truncate" title={item.source}>{item.source}</td>
                      <td className="px-2 py-5 text-xs w-[100px] whitespace-nowrap">{item.created}</td>
                      <td className="px-2 py-5 text-xs font-semibold text-blue-600 w-[100px]">
                        {item.citationStyle}
                      </td>
                      <td className="px-2 py-5 text-xs w-[150px] line-clamp-2" title={item.abstract}>{item.abstract}</td>
                      <td className="px-2 py-5 text-right relative w-[80px]">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50"
                          onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                        >
                          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        </button>
                        {activeDropdown === item.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                            <div className="py-1">
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 w-full text-left"
                                onClick={() => {
                                  setSelectedCitation(item.formattedCitation);
                                  setShowModal(true);
                                  setActiveDropdown(null);
                                }}
                              >
                                
                                <MdOutlineFileOpen  /> Thông tin đã trích dẫn
                              </button>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                onClick={async () => {
                                  try {
                                    await documentService.trashDocument({ documentId: item.id, userId: Number(userId) });
                                    setItems(prev => prev.filter(i => i.id !== item.id));
                                    setActiveDropdown(null);
                                  } catch {
                                  }
                                }}
                              >
                                <FaTrash className="h-4 w-4" />
                                Chuyển đến thùng rác
                              </button>

                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-red-50 w-full text-left"
                                onClick={() => {setCitationModal(true) 
                                setDocumentId(item.id) }
                                }
                              >
                                <FaFilePen className="h-4 w-4" />
                                Đổi kiểu trích dẫn
                              </button>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 w-full text-left"
                                onClick={() => {
                                  setUpdateData({
                                    ...updateData,
                                    documentId: item.id,
                                    title: item.fileName || "",
                                    year: item.publicationDate || "",
                                    author: item.author || "",
                                    publisher: item.source || "",
                                    doi: item.doi || ""
                                  });
                                  setUpdateModal(true);
                                  setActiveDropdown(null);
                                }}
                              >
                                <FaPen className="h-4 w-4" />
                                Cập nhật thông tin
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

            {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] border border-blue-100 relative animate-fadeIn">
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Thông tin trích dẫn</h3>
                    <p className="text-gray-500">Chi tiết trích dẫn của tài liệu</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">Trích dẫn:</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {selectedCitation || "Không có thông tin trích dẫn"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {citationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div
                className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] transform transition-all duration-300 
              border border-blue-100 relative animate-fadeIn"
              >
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center
                  text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setCitationModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">
                      Chọn Kiểu Trích Dẫn
                    </h3>
                    <p className="text-gray-500">
                      Chọn định dạng trích dẫn phù hợp cho tài liệu của bạn
                    </p>
                  </div>

                  {loadingCitations && (
                    <div className="text-center text-gray-500">Đang tải kiểu trích dẫn...</div>
                  )}

                  {!citationStyles.length && !loadingCitations && (
                    <div className="text-center text-gray-500">Không có kiểu trích dẫn để hiển thị</div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {citationStyles.map((type) => (
                      <div
                        key={type.style || type.id}
                        className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                          selectedCitation === (type.style || type.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedCitation(type.style || type.id)}
                      >
                        <h4 className="font-bold text-lg text-blue-600">
                          {type.style}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {type.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={async () => {
                        if (!documentId) {
                          toast.error("Không tìm thấy documentId. Vui lòng lưu tài liệu trước.");
                          return;
                        }
                        try {
                          setreGeneratingCitation(true);
                          const genRes = await citationService.regenerateCitaion({
                            userId,
                            documentId,
                            newCitationStyle: selectedCitation,
                          });
                          if (genRes?.result) {
                            setCitationResult(genRes.result);
                            setCitationResultModal(true);
                            setCitationModal(false);
                          }
                        } catch (e) {
                          console.error("Generate citation failed", e);
                          toast.error(e?.message || "Tạo trích dẫn thất bại");
                        } finally {
                          setreGeneratingCitation(false);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                      hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                    >
                      {reGeneratingCitation ? "Đang trích dẫn..." : "Trích dẫn"}
                    </button>
                    <button
                      onClick={() => setCitationModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-full
                      hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Không trích dẫn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {citationResultModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] border border-blue-100 relative animate-fadeIn">
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setCitationResultModal(false)}
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
                        <span className="text-blue-600">{citationResult?.style}</span>
                      </div>
                      <div className="relative">
                        <div className="bg-white rounded-lg p-3 pr-10 border border-gray-200 hover:border-blue-300 transition-colors">
                          {citationResult?.formattedCitation}
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(citationResult?.formattedCitation);
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
                            navigator.clipboard.writeText(citationResult?.inTextCitation);
                            toast.success('Đã sao chép trích dẫn!');
                          }}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                        >
                          <FaClipboard />
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                        {citationResult?.inTextCitation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Update Modal */}
          {updateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="bg-white rounded-3xl shadow-2xl p-5 w-[500px] border border-blue-100 relative animate-fadeIn h-[450px]">
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setUpdateModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-600 mb-1">Cập nhật thông tin</h3>
                    <p className="text-sm text-gray-500">Cập nhật thông tin cho tài liệu của bạn</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-0.5">Tiêu đề</label>
                      <input
                        type="text"
                        value={updateData.title}
                        onChange={(e) => setUpdateData({...updateData, title: e.target.value})}
                        className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-0.5">Năm xuất bản</label>
                      <input
                        type="text"
                        value={updateData.year}
                        onChange={(e) => setUpdateData({...updateData, year: e.target.value})}
                        className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-0.5">Tác giả</label>
                      <input
                        type="text"
                        value={updateData.author}
                        onChange={(e) => setUpdateData({...updateData, author: e.target.value})}
                        className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-0.5">Nhà xuất bản</label>
                      <input
                        type="text"
                        value={updateData.publisher}
                        onChange={(e) => setUpdateData({...updateData, publisher: e.target.value})}
                        className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      
                      <input
                        type="hidden"
                        value={updateData.doi}
                        onChange={(e) => setUpdateData({...updateData, doi: e.target.value})}
                        className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                  </div>
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={async () => {
                        try {
                          console.log("Updating with data:", updateData);
                          await documentService.updateDocument(updateData);
                          toast.success("Cập nhật thông tin thành công!");
                          setUpdateModal(false);
                          const result = await documentService.getDocByUserIdAndType(
                            userId,
                            folderName,
                            currentPage,
                            itemsPerPage
                          );
                          const documents = result?.documents || [];
                          setItems(documents);
                        } catch (error) {
                          toast.error(error?.message || "Cập nhật thông tin thất bại");
                        }
                      }}
                      className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={() => setUpdateModal(false)}
                      className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
