import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaFileAlt } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import documentService from "../../redux/services/document/documentService";
import { Link } from "react-router-dom";

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
          <div className="border border-blue-400 rounded-xl overflow-hidden relative">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">File name</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Title</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Created</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Citation Style</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Đang tải...</td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Không có dữ liệu</td>
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
                      <td className="px-6 py-5 text-base font-semibold text-blue-600">{item.citation}</td>
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
