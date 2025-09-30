import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaUpload, FaLink, FaTrash, FaFilter } from "react-icons/fa";
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
  const [selectedCitation, setSelectedCitation] = useState("APA");
  const [citationStyles, setCitationStyles] = useState([]);
  const [loadingCitations, setLoadingCitations] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [generatingCitation, setGeneratingCitation] = useState(false);
  const [citationResult, setCitationResult] = useState(null);
  const [citationResultModal, setCitationResultModal] = useState(false);

  // Fetch citation styles when opening the citation modal for the first time
  useEffect(() => {
    const fetchStyles = async () => {
      if (!citationModal || citationStyles.length) return;
      setLoadingCitations(true);
      try {
        const styles = await citationService.getCitationStyle();
        setCitationStyles(styles || []);
        // If current selection not in new list, default to first style
        if (styles && styles.length) {
          const hasSelected = styles.some((s) => (s.style || s.id) === selectedCitation);
          if (!hasSelected) {
            setSelectedCitation(styles[0].style || styles[0].id);
          }
        }
      } catch (e) {
        // Keep fallback list silently; optionally log
        console.error("Failed to load citation styles", e);
      }
      setLoadingCitations(false);
    };
    fetchStyles();
  }, [citationModal]);

  // State lưu thông tin sau khi upload
  const [uploadInfo, setUploadInfo] = useState({});
  const [fileInput, setFileInput] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);

  // Lấy user từ Redux hoặc localStorage
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");

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
          {/* Title */}
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
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
              />
            </div>

            {/* Nút Xóa + Dự án mới */}
            <div className="flex items-center justify-end gap-3">
              <button className="p-3 bg-blue-100 rounded-full border border-blue-400 hover:bg-blue-200">
                <FaTrash className="text-blue-600" />
              </button>
              <button className="px-6 py-3 rounded-full border border-blue-400 bg-gradient-to-r from-blue-100 to-cyan-100 hover:bg-blue-200">
                Dự án mới
              </button>
            </div>
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
              <FaLink className="mr-2" /> URL
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
                          alert(err.message || 'Upload thất bại');
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
                            alert(err.message || 'Upload thất bại');
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

          {/* Info Modal sau khi upload file/url */}
          {infoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-[500px] border border-blue-100 relative animate-fadeIn">
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setInfoModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">Thông tin nhận diện tài liệu</h3>
                  <div className="text-gray-700">
                    <div className="mb-2"><span className="font-semibold">Loại tài liệu:</span> {uploadInfo.typeName}</div>
                    <div className="mb-2"><span className="font-semibold">Mã loại:</span> {uploadInfo.documentType}</div>
                    {uploadInfo.url && <div className="mb-2"><span className="font-semibold">URL:</span> {uploadInfo.url}</div>}
                    {uploadInfo.filePath && <div className="mb-2"><span className="font-semibold">File Path:</span> {uploadInfo.filePath}</div>}
                    {uploadInfo.fileName && <div className="mb-2"><span className="font-semibold">File Name:</span> {uploadInfo.fileName}</div>}
                  </div>
                  <div className="text-blue-600 font-semibold mb-2">{uploadInfo.confirmationMessage}</div>
                  <div className="text-gray-500 mb-2">{uploadInfo.subtitle}</div>
                  <div className="text-gray-700 mb-2">{uploadInfo.question}</div>
                  <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 font-semibold"
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
                        alert(res?.message || "Lưu thành công!");
                        setInfoModal(false);
                        setCitationModal(true);
                      } catch (err) {
                        alert(err.message || "Lưu thất bại!");
                      }
                      setExtractLoading(false);
                    }}
                  >
                    {extractLoading ? "Đang lưu..." : "Lưu tài liệu"}
                  </button>
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
                          alert("Không tìm thấy documentId. Vui lòng lưu tài liệu trước.");
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
                          alert(e?.message || "Tạo trích dẫn thất bại");
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
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">Kết quả trích dẫn</h3>
                  <div className="text-gray-700">
                    <div className="mb-2"><span className="font-semibold">Style:</span> {citationResult?.style}</div>
                    <div className="mb-2"><span className="font-semibold">Formatted:</span> {citationResult?.formattedCitation}</div>
                    <div className="mb-2"><span className="font-semibold">In-text:</span> {citationResult?.inTextCitation}</div>
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
          <div className="flex items-center justify-between bg-blue-50 border border-blue-300 rounded-full px-4 py-3 mb-12">
            <button className="flex items-center gap-2">
              <FaFilter /> Bộ lọc
            </button>
            <span className="text-blue-600 cursor-pointer">
              Phân loại theo ▼
            </span>
          </div>

          {/* Danh sách cập nhật dự án */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              Cập Nhật Dự Án
            </h2>
            <p className="text-gray-600 mb-4">
              Dự án bạn đã làm việc/thao tác/tải lên/...
            </p>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="text-blue-600 font-semibold">
                        {item.id}. {item.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.date} • {item.type} • {item.status}
                    </div>
                  </div>
                  <div
                    className={`h-1 bg-blue-600 ${item.progress} mt-2`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
