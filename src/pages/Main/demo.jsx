import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaUpload, FaLink, FaTrash } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import documentService from "../../redux/services/document/documentService";
import { Link } from "react-router-dom";

export default function Demo() {
  const [infoModal, setInfoModal] = useState(false);
  const [extractLoading, setExtractLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // State lưu thông tin sau khi upload
  const [uploadInfo, setUploadInfo] = useState({});
  const [fileInput, setFileInput] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);

  // Lấy user từ Redux hoặc localStorage
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");

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
          <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Trích Dẫn Và Lưu Trữ (Demo)
          </h1>
          <button className="h-10 w-50 mb-5 justify-start items-start rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition">
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLScN1zi3edgSS2rg5nSFGql-_TdCKa4dBk4jEBwPGqChCDf-7g/viewform?usp=sharing&ouid=112926310380479204670">
             Gửi Feedback
           </Link>
          </button>
          </div>
          
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
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] border border-blue-100 relative animate-fadeIn">
                <button
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
                  onClick={() => setInfoModal(false)}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Thông tin nhận diện tài liệu</h3>
                    <p className="text-gray-500">Xác nhận thông tin tài liệu trước khi lưu</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                        <span className="font-semibold text-gray-700">Loại tài liệu:</span>
                        <span className="text-blue-600">{uploadInfo.typeName}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                        <span className="font-semibold text-gray-700">Mã loại:</span>
                        <span className="text-blue-600">{uploadInfo.documentType}</span>
                      </div>
                      {uploadInfo.url && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">URL:</span>
                          <span className="text-blue-600 max-w-[300px] truncate">{uploadInfo.url}</span>
                        </div>
                      )}
                      {uploadInfo.filePath && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">File Path:</span>
                          <span className="text-blue-600 max-w-[300px] truncate">{uploadInfo.filePath}</span>
                        </div>
                      )}
                      {uploadInfo.fileName && (
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-gray-700">File Name:</span>
                          <span className="text-blue-600">{uploadInfo.fileName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {uploadInfo.confirmationMessage && (
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-200">
                      <p className="font-medium">{uploadInfo.confirmationMessage}</p>
                      {uploadInfo.subtitle && (
                        <p className="text-blue-600 mt-2 text-sm">{uploadInfo.subtitle}</p>
                      )}
                    </div>
                  )}

                  {uploadInfo.question && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <p className="text-gray-700">{uploadInfo.question}</p>
                    </div>
                  )}

                  <button
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                    hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 
                    font-semibold flex items-center justify-center gap-2"
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
                        const res = await documentService.extractAndSave(payload);
                        toast.success(res?.message || "Lưu thành công!");
                        setInfoModal(false);
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
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          
          </div>
        </div>
      </div>
    </div>
  );
}


