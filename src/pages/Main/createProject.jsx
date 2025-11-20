import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaUpload, FaLink, FaTrash, FaFilter, FaClipboard, FaSortUp, FaSortDown, FaSort, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineFileOpen } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import documentService from "../../redux/services/document/documentService";
import citationService from "../../redux/services/citation/citationService";

export default function CreateProject() {
  const [infoModal, setInfoModal] = useState(false);
  const [extractLoading, setExtractLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [citationModal, setCitationModal] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState("");
  const [citationStyles, setCitationStyles] = useState([]);
  const [loadingCitations, setLoadingCitations] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [generatingCitation, setGeneratingCitation] = useState(false);
  const [citationResult, setCitationResult] = useState(null);
  const [citationResultModal, setCitationResultModal] = useState(false);
  const [uploadInfo, setUploadInfo] = useState({});
  const [fileInput, setFileInput] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [originalDocuments, setOriginalDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);



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

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId) return;
      setLoadingDocuments(true);
      try {
        const result = await documentService.getDocAllByUserId(userId);
        const docs = result?.allDocuments || result?.documents || result || [];
        const sortedDocs = [...docs].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        setDocuments(sortedDocs);
        setOriginalDocuments(sortedDocs);
        setFilteredDocuments(sortedDocs);
        setSelectedCitation(sortedDocs.formattedCitation)
      } catch (e) {
        console.error("Failed to load documents", e);
        toast.error("Không thể tải danh sách tài liệu");
      }
      setLoadingDocuments(false);
    };
    fetchDocuments();
  }, [userId]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(doc => {
        const title = (doc.title || doc.filePath || '').toLowerCase();
        return title.includes(searchQuery.toLowerCase());
      });
      setFilteredDocuments(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, documents]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const handleResetSort = () => {
    setDocuments([...originalDocuments]);
    setSortField(null);
    setSortOrder('asc');
    setDropdownOpen(false);
  };

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);

    const sortedDocs = [...documents].sort((a, b) => {
      let aValue = '';
      let bValue = '';

      if (field === 'title') {
        aValue = (a.title || a.filePath || 'Untitled').toLowerCase();
        bValue = (b.title || b.filePath || 'Untitled').toLowerCase();
      } else if (field === 'author') {
        aValue = (a.author || '').toLowerCase();
        bValue = (b.author || '').toLowerCase();
      }

      if (aValue < bValue) return newOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setDocuments(sortedDocs);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-2 text-gray-400" />;
    return sortOrder === 'asc' 
      ? <FaSortUp className="inline ml-2 text-blue-600" />
      : <FaSortDown className="inline ml-2 text-blue-600" />;
  };


  const items = [
    {
      id: 4,
      name: "Tên Dự Án",
      date: "3/07/2025",
      type: "PDF.file",
      status: "Not.cited.",
      progress: "w-3/4",
    },
    {
      id: 3,
      name: "Tên Dự Án",
      date: "2/07/2025",
      type: "Article",
      status: "Not.cited.",
      progress: "w-2/3",
    },
    {
      id: 2,
      name: "Tên Dự Án",
      date: "2/07/2025",
      type: "Word.file",
      status: "Cited.",
      progress: "w-2/3",
    },
    {
      id: 1,
      name: "Tên Dự Án",
      date: "1/07/2025",
      type: "PDF.file",
      status: "Not.cited.",
      progress: "w-1/2",
    },
  ];

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
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6">
            Trích Dẫn Và Lưu Trữ
          </h1>

          {/* Top Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Tìm dự án */}
            <div className="col-span-2 flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-400 rounded-full px-4 py-3">
              <FaSearch className="text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Tìm dự án"
                className="bg-transparent w-full outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Nút Xóa + Dự án mới
            <div className="flex items-center justify-end gap-3">
              <button className="p-3 bg-blue-100 rounded-full border border-blue-400 hover:bg-blue-200">
                <FaTrash className="text-blue-600" />
              </button>
              <button className="px-6 py-3 rounded-full border border-blue-400 bg-gradient-to-r from-blue-100 to-cyan-100 hover:bg-blue-200">
                Dự án mới
              </button>
            </div> */}
          </div>

          {/* Upload + URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <button
              className="flex items-center w-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-400 rounded-full px-4 py-3 hover:bg-blue-200"
              onClick={() => {
                setModalType("file");
                setModalOpen(true);
              }}
            >
              <FaUpload className="mr-2" /> Tải file
            </button>
            <button
              className="flex items-center w-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-400 rounded-full px-4 py-3 hover:bg-blue-200"
              onClick={() => {
                setModalType("url");
                setModalOpen(true);
              }}
            >
              <FaLink className="mr-2" /> 
              <p>URL (đang hoàn thiện)</p>
            </button>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div
                className="bg-white rounded-3xl shadow-2xl p-8 w-[500px] transform transition-all duration-300 scale 
              border border-blue-100 relative animate-fadeIn"
              >
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center
                  text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setModalOpen(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                {modalType === "file" ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">Tải File Lên</h3>
                      <p className="text-gray-500">Chọn file từ thiết bị của bạn</p>
                    </div>
                    <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                      <FaUpload className="mx-auto text-4xl text-blue-500 mb-4" />
                      <input type="file" className="hidden" id="fileInput" onChange={e => setFileInput(e.target.files[0])} />
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Chọn file</span>
                        <span className="text-gray-500"> hoặc kéo thả file vào đây</span>
                      </label>
                      {fileInput && <div className="mt-2 text-blue-600">{fileInput.name}</div>}
                    </div>
                    <button
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                      disabled={loadingUpload || !fileInput}
                      onClick={async () => {
                        if (!fileInput) return;
                        setLoadingUpload(true);
                        try {
                          const res = await documentService.uploadFile(fileInput);
                          const result = res?.result;
                          setUploadInfo({
                            documentType: result?.detectedType,
                            tempId: result?.tempId,
                            filePath: result?.filePath,
                            fileName: fileInput.name,
                            typeName: result?.typeName,
                            confirmationMessage: result?.confirmationMessage,
                            question: result?.question,
                            subtitle: result?.subtitle,
                          });
                          setModalOpen(false);
                          setInfoModal(true);
                        } catch (err) {
                          toast.error(err.message || 'Upload thất bại');
                        }
                        setLoadingUpload(false);
                      }}
                    >
                      {loadingUpload ? 'Đang tải...' : 'Tải lên'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">Nhập URL</h3>
                      <p className="text-gray-500">Dán link từ nguồn trực tuyến</p>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-6 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                      />
                      <button
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                        disabled={loadingUpload || !urlInput}
                        onClick={async () => {
                          if (!urlInput) return;
                          setLoadingUpload(true);
                          try {
                            console.log("Uploading URL:", urlInput);
                            const res = await documentService.uploadUrl(urlInput);
                            const result = res?.result;
                            setUploadInfo({
                              documentType: result?.detectedType,
                              tempId: result?.tempId,
                              url: result?.url,
                              typeName: result?.typeName,
                              confirmationMessage: result?.confirmationMessage,
                              question: result?.question,
                              subtitle: result?.subtitle,
                            });
                            setModalOpen(false);
                            setInfoModal(true);
                          } catch (err) {
                            toast.error(err.message || 'Upload thất bại');
                          }
                          setLoadingUpload(false);
                        }}
                      >
                        {loadingUpload ? 'Đang tải...' : 'Lưu URL'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Toaster position="top-right" />

          {/* Info Modal sau khi upload file/url */}
          
          {infoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="bg-white rounded-3xl shadow-2xl p-6 w-[600px] h-[600px] border border-blue-100 relative animate-fadeIn flex flex-col">
                {/* Nút đóng */}
                <button
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full border border-blue-200 
                            flex items-center justify-center text-blue-600 hover:text-blue-800 
                            hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setInfoModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>

                {/* Header */}
                <div className="text-center mb-3">
                  <h3 className="text-2xl font-bold text-blue-600 mb-1">Thông tin nhận diện tài liệu</h3>
                  <p className="text-gray-500 text-sm">Xác nhận thông tin tài liệu trước khi lưu</p>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {/* Thông tin tài liệu */}
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                        <span className="font-semibold text-gray-700">Loại tài liệu:</span>
                        <span className="text-blue-600 text-sm">{uploadInfo.typeName}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                        <span className="font-semibold text-gray-700">Mã loại:</span>
                        <span className="text-blue-600 text-sm">{uploadInfo.documentType}</span>
                      </div>
                      {uploadInfo.url && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">URL:</span>
                          <span className="text-blue-600 text-sm max-w-[280px] truncate">{uploadInfo.url}</span>
                        </div>
                      )}
                      {uploadInfo.filePath && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">File Path:</span>
                          <span className="text-blue-600 text-sm max-w-[280px] truncate">{uploadInfo.filePath}</span>
                        </div>
                      )}
                      {uploadInfo.fileName && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">File Name:</span>
                          <span className="text-blue-600 text-sm">{uploadInfo.fileName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thông điệp xác nhận */}
                  {uploadInfo.confirmationMessage && (
                    <div className="bg-blue-50 text-blue-700 p-3 rounded-xl border border-blue-200 text-sm">
                      <p className="font-medium">{uploadInfo.confirmationMessage}</p>
                      {uploadInfo.subtitle && (
                        <p className="text-blue-600 mt-1 text-xs">{uploadInfo.subtitle}</p>
                      )}
                    </div>
                  )}

                  {/* Câu hỏi */}
                  {uploadInfo.question && (
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-sm">
                      <p className="text-gray-700">{uploadInfo.question}</p>
                    </div>
                  )}
                </div>

                {/* Nút lưu */}
                <button
                  className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                            hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 
                            transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                  disabled={extractLoading}
                  onClick={async () => {
                    setExtractLoading(true);
                    try {
                      let payload = {
                        userId,
                        filePath: "",
                        fileName: "",
                        url: "",
                        documentType: uploadInfo.documentType,
                        saveToFolder: true,
                        tempId: uploadInfo.tempId,
                      };
                      if (uploadInfo.url) {
                        payload.url = uploadInfo.url;
                      } else if (uploadInfo.filePath || uploadInfo.fileName) {
                        payload.filePath = uploadInfo.filePath || "";
                        payload.fileName = uploadInfo.fileName || "";
                      }
                      console.log("extractAndSave payload:", payload);
                      const res = await documentService.extractAndSave(payload);
                      const newDocId = res?.result?.documentId || res?.result?.id || res?.documentId;
                      if (newDocId) {
                        setDocumentId(newDocId);
                      }
                      toast.success("Lưu thành công!" || res?.message );
                      setInfoModal(false);
                      setCitationModal(true);
                    } catch (err) {
                      toast.error(err.message || "Lưu thất bại!");
                    }
                    setExtractLoading(false);
                  }}
                >
                  {extractLoading ? "Đang lưu..." : "Lưu tài liệu"}
                </button>
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
                          setGeneratingCitation(true);
                          const genRes = await citationService.generateCitaion({
                            userId,
                            documentId,
                            citationStyle: selectedCitation,
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
                          setGeneratingCitation(false);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                      hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                    >
                      {generatingCitation ? "Đang trích dẫn..." : "Trích dẫn"}
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
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setCitationResultModal(false)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 font-semibold"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bộ lọc */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-300 rounded-full px-6 py-3 mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <FaFilter className="text-blue-600" /> 
              <span className="font-semibold">Bộ lọc</span>
            </div>
            <div className="flex items-center gap-3">
              {sortField && (
                <button
                  onClick={handleResetSort}
                  className="px-4 py-2 text-sm bg-white text-gray-600 rounded-full border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                >
                  Trả lại nguyên bản
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white text-blue-600 cursor-pointer outline-none pl-4 pr-10 py-2 rounded-full border border-blue-300 font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  {sortField && sortOrder ? (
                    sortField === 'title' && sortOrder === 'asc' ? 'Tên File (A-Z)' :
                    sortField === 'title' && sortOrder === 'desc' ? 'Tên File (Z-A)' :
                    sortField === 'author' && sortOrder === 'asc' ? 'Tác Giả (A-Z)' :
                    'Tác Giả (Z-A)'
                  ) : 'Phân loại theo'}
                  <svg 
                    className={`text-blue-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none"
                  >
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden z-50">
                  {[
                    { value: 'title-asc', label: 'Tên File (A-Z)' },
                    { value: 'title-desc', label: 'Tên File (Z-A)' },
                    { value: 'author-asc', label: 'Tác Giả (A-Z)' },
                    { value: 'author-desc', label: 'Tác Giả (Z-A)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const [field, order] = option.value.split('-');
                        setSortField(field);
                        setSortOrder(order);
                        setDropdownOpen(false);
                        
                        const sortedDocs = [...documents].sort((a, b) => {
                          let aValue = '';
                          let bValue = '';

                          if (field === 'title') {
                            aValue = (a.title || a.filePath || 'Untitled').toLowerCase();
                            bValue = (b.title || b.filePath || 'Untitled').toLowerCase();
                          } else if (field === 'author') {
                            aValue = (a.author || '').toLowerCase();
                            bValue = (b.author || '').toLowerCase();
                          }

                          if (aValue < bValue) return order === 'asc' ? -1 : 1;
                          if (aValue > bValue) return order === 'asc' ? 1 : -1;
                          return 0;
                        });

                        setDocuments(sortedDocs);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                        sortField === option.value.split('-')[0] && sortOrder === option.value.split('-')[1]
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>

          {/* Danh sách tài liệu */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              Cập Nhật Dự Án
            </h2>

            <div className="border border-blue-400 rounded-xl overflow-hidden relative min-h-[400px]">
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[30%]">
                      Tên File {sortField === 'title' && getSortIcon('title')}
                    </th>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[18%]">
                      Tác Giả {sortField === 'author' && getSortIcon('author')}
                    </th>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[12%]">Ngày tạo</th>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[13%]">Kiểu trích</th>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[17%]">Nguồn</th>
                    <th className="px-4 py-5 border-b border-blue-200 text-lg w-[10%] text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {loadingDocuments ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-lg">
                        Đang tải...
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-lg">
                        {searchQuery ? 'Không tìm thấy kết quả phù hợp' : 'Không có dữ liệu'}
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((doc, idx) => (
                      <tr key={doc.documentId} className="hover:bg-blue-50">
                        <td className="px-4 py-3">
                          <a
                            href={doc.filePath || doc.sourceUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-700 no-underline hover:text-blue-900 line-clamp-2 block"
                          >
                            {doc.title || doc.filePath || "Untitled"}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm truncate" title={doc.author}>
                          {doc.author || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-GB') : "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                          {doc.citationStyle || "Chưa trích dẫn"}
                        </td>
                        <td className="px-4 py-3 text-sm line-clamp-2">
                          {doc.source || ""}
                        </td>
                        <td className="px-4 py-3 text-right relative">
                          <button
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                            onClick={() => setActiveDropdown(activeDropdown === doc.documentId ? null : doc.documentId)}
                          >
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                          </button>
                          {activeDropdown === doc.documentId && (
                            <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                              <div className="py-1">
                                <button
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 w-full text-left transition-colors"
                                  onClick={() => {
                                    setSelectedCitation(doc.formattedCitation);
                                    setShowModal(true);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <MdOutlineFileOpen className="text-lg" /> Thông tin đã trích dẫn
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

            {/* Modal */}
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


            {/* Pagination */}
            {filteredDocuments.length > 0 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
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
                      className={`w-10 h-10 rounded-full border transition-colors ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-blue-400 text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
