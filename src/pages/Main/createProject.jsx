import { useState } from "react";
import { FaSearch, FaUpload, FaLink, FaTrash, FaFilter } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";

export default function CreateProject() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'file' or 'url'
  const [citationModal, setCitationModal] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState("APA");

  const citationTypes = [
    {
      id: "APA",
      name: "APA",
      description: "American Psychological Association",
    },
    { id: "MLA", name: "MLA", description: "Modern Language Association" },
    { id: "Harvard", name: "Harvard", description: "Harvard Referencing" },
    { id: "Chicago", name: "Chicago", description: "Chicago Manual of Style" },
  ];
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
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">
                        Tải File Lên
                      </h3>
                      <p className="text-gray-500">
                        Chọn file từ thiết bị của bạn
                      </p>
                    </div>
                    <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                      <FaUpload className="mx-auto text-4xl text-blue-500 mb-4" />
                      <input type="file" className="hidden" id="fileInput" />
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">
                          Chọn file
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          hoặc kéo thả file vào đây
                        </span>
                      </label>
                    </div>
                    <button
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                    hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                      onClick={() => {
                        setCitationModal(true);
                        setModalOpen(false);
                      }}
                    >
                      Tải lên
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">
                        Nhập URL
                      </h3>
                      <p className="text-gray-500">
                        Dán link từ nguồn trực tuyến
                      </p>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="https://..."
                        className="w-full px-6 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 
                        focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                      />
                      <button
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                      hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                        onClick={() => {
                          setCitationModal(true);
                          setModalOpen(false);
                        }}
                      >
                        Lưu URL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Citation Style Modal */}
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

                  <div className="grid grid-cols-2 gap-4">
                    {citationTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                          selectedCitation === type.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedCitation(type.id)}
                      >
                        <h4 className="font-bold text-lg text-blue-600">
                          {type.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {type.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => {
                        setCitationModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                      hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
                    >
                      Lưu và tiếp tục
                    </button>
                    <button
                      onClick={() => setCitationModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-full
                      hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Không lưu
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
