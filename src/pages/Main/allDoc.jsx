import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaFileAlt, FaChevronDown } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import documentService from "../../redux/services/document/documentService";
import { Link } from "react-router-dom";

export default function AllDoc() {
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

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
  }, [userId, filterStatus, filterType]);

  const filteredItems = items.filter((item) =>
    item.fileName.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className="border border-blue-400 rounded-xl overflow-hidden relative">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">File name</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Title</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Created</th>
                  <th className="px-6 py-5 border-b border-blue-200 text-lg">Citation</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Đang tải...</td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => (
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
                      <td className="px-6 py-5 text-base font-semibold text-blue-600">{item.citationStyle}</td>
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
