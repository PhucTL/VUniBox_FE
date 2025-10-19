import Banner1 from "../../assets/Banner1.png";
import Banner2 from "../../assets/Banner2.png";
import Aboutus from "../../assets/Aboutus.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FeaturesSection() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  return (
    <div className="bg-white">
      {/* Blog Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Tiêu đề */}
        <div className="flex flex-col items-center justify-center mb-4 gap-10">
          <h3 className="text-gray-800 font-bold text-xl flex">Blog</h3>
          <h1 className="text-5xl font-bold text-center mx-4 flex text-[#135ed0]">
            Blog - Banner - CPC
          </h1>
          <h3 className=" text-xl text-gray-800 font-bold flex">
            Space for other investor / platform
          </h3>
        </div>

        <div className="flex flex-wrap gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="flex w-full md:w-[48%] gap-6 items-start">
            <img
              src={Banner1}
              alt="Blog"
              className="w-40 h-40 object-cover rounded-2xl"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <h4 className="font-bold text-lg mb-1">Name</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Information/Summary/Content
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs">Img</span>
                </div>
                <span className="font-medium">Author</span>
                <span>•</span>
                <span>Jul 01 2025</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex w-full md:w-[48%] gap-6 items-start">
            <img
              src={Banner2}
              alt="Blog"
              className="w-40 h-40 object-cover rounded-2xl"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <h4 className="font-bold text-lg mb-1">Name</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Information/Summary/Content
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs">Img</span>
                </div>
                <span className="font-medium">Author</span>
                <span>•</span>
                <span>Jul 01 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us*/}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Image */}
          <div className="flex-1">
            <img
              src={Aboutus}
              alt="Study tools"
              className="w-full h-[500px] rounded-2xl shadow-md"
            />
          </div>

          {/* Right: Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
              Làm thế nào để tận dụng tối đa <br /> công cụ trong học thuật?
            </h2>
            <p className="text-gray-600 mb-8">
              Đừng để tài liệu thất lạc hay trích dẫn sai làm chậm bước tiến học
              thuật của bạn. Hãy để VUniBox tự động lưu – phân loại – trích dẫn,
              giúp bạn tập trung vào điều quan trọng nhất: kiến thức.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full">
              <Link to="https://www.facebook.com/VUniBox">Về chúng tôi</Link>
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90">
            {isAuthenticated ? (
              <Link to="demo">Bắt đầu ngay</Link>
            ) : (
              <Link to="login">Bắt đầu ngay</Link>
            )}
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
