import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaFileAlt, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import documentService from "../../redux/services/document/documentService";
import { Link } from "react-router-dom";
import citationService from "../../redux/services/citation/citationService";
import toast from 'react-hot-toast';

export default function SavedDoc() {
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await documentService.getDocSavedByUserId(Number(userId));
        const documents = result?.savedDocuments || result?.documents || result || [];
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
  }, [userId]);

  return (
    <div className="min-h-screen bg-white flex flex-col mt-25 w-full">
      <div className="flex flex-1 w-full px-8 pb-8 gap-8">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Tài liệu đã lưu</h1>
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
          <div className="border border-blue-400 rounded-xl overflow-x-auto relative">
            <table className="min-w-[900px] w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg max-w-[260px] w-[260px]">File name</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg max-w-[260px] w-[260px]">Title</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg whitespace-nowrap w-[160px]">Created</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg w-[160px]">Citation Style</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg w-[120px]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">Đang tải...</td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">Không có dữ liệu</td>
                  </tr>
                ) : (
                  items.filter(item => item.fileName.toLowerCase().includes(search.toLowerCase())).map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="px-2 py-5 flex items-center gap-3 max-w-[240px] truncate">
                        <Link
                          to={item.filePath || item.sourceUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-blue-700 no-underline hover:text-blue-900 truncate max-w-[200px] block"
                          title={item.fileName}
                        >
                          {item.fileName}
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-base max-w-[240px] truncate" title={item.title}>{item.title}</td>
                      <td className="px-6 py-5 text-base whitespace-nowrap">{item.created}</td>
                      <td className="px-6 py-5 text-base font-semibold text-blue-600 w-[160px]">
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
                      <td className="px-6 py-5 text-right w-[120px]">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-red-600 hover:bg-red-50"
                          onClick={async () => {
                            try {
                              await documentService.trashDocument({ documentId: item.id, userId: Number(userId) });
                              toast.success('Đã chuyển vào thùng rác!');
                            } catch {
                              toast.error('Lỗi xóa tài liệu');
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
        </div>
      </div>
    </div>
  );
}
