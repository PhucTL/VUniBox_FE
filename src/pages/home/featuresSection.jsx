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
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Tiêu đề */}
        <div className="flex flex-col items-center justify-center mb-4 md:mb-6 gap-4 md:gap-10">
          <h3 className="text-gray-800 font-bold text-lg md:text-xl flex">Blog</h3>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-4 flex text-[#135ed0]">
            Blog - Banner - CPC
          </h1>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="flex w-full md:w-[48%] gap-3 md:gap-6 items-start">
            <img
              src={Banner1}
              alt="Blog"
              className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-2xl flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 mb-1">Technology</p>
              <h4 className="font-bold text-base md:text-lg mb-1">Công nghệ & Bảo tồn</h4>
              <p className="text-gray-600 mb-2 md:mb-4 text-xs md:text-sm">
                “Vunibox đang mở ra hướng đi mới cho bảo tàng số tại Việt Nam — nơi lịch sử được chạm, cảm nhận và lưu giữ bằng công nghệ.”
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                <span className="font-medium">Vunibox Team</span>
                <span>•</span>
                <span>Jul 01 2025</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex w-full md:w-[48%] gap-3 md:gap-6 items-start">
            <img
              src={Banner2}
              alt="Blog"
              className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-2xl flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 mb-1">Technology</p>
              <h4 className="font-bold text-base md:text-lg mb-1">Tương lai của công nghệ năm 2025</h4>
              <p className="text-gray-600 mb-2 md:mb-4 text-xs md:text-sm">
              “Khám phá những đổi mới tiên tiến định hình thập kỷ tiếp theo.”              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">Vunibox Team</span>
                <span>•</span>
                <span>Jul 05 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us*/}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Left: Image */}
          <div className="flex-1 w-full">
            <img
              src={Aboutus}
              alt="Study tools"
              className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Right: Content */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-blue-600">
              Làm thế nào để tận dụng tối đa <br className="hidden md:block" /> công cụ trong học thuật?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
              Đừng để tài liệu thất lạc hay trích dẫn sai làm chậm bước tiến học
              thuật của bạn. Hãy để VUniBox tự động lưu – phân loại – trích dẫn,
              giúp bạn tập trung vào điều quan trọng nhất: kiến thức.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="px-5 md:px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm md:text-base whitespace-nowrap">
              <Link to="https://www.facebook.com/VUniBox">Về chúng tôi</Link>
            </button>
            <button className="px-5 md:px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90 text-sm md:text-base whitespace-nowrap">
            {isAuthenticated ? (
              <Link to="createproject">Bắt đầu ngay</Link>
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
