import { FiBookOpen, FiPlus, FiLayers, FiDatabase, FiEye } from "react-icons/fi";
import {
  AiOutlineClockCircle,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPricetagOutline } from "react-icons/io5";

export default function IntroSection() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  return (
    <div className="bg-white">
      {/* Section 1 */}
      <div className="relative mx-auto px-4 md:px-6 py-20 md:py-32 mt-16 md:mt-22 min-h-[400px] md:min-h-[500px] bg-[url('/images/image.jpg')] bg-center bg-no-repeat bg-cover flex items-center justify-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-2xl text-center px-4">
          <p className="text-sm md:text-lg text-white mb-3 md:mb-4 font-semibold tracking-wide drop-shadow-lg">
            Tài liệu gọn gàng, trích dẫn sẵn sàng
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">VUniBox</h1>
          <p className="text-base md:text-xl text-white font-medium mb-6 md:mb-10 leading-relaxed drop-shadow-lg">
            Nâng Tầm Nghiên Cứu Với Nền Tảng Lưu Trữ và Trích Dẫn Toàn Diện
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg text-sm md:text-base whitespace-nowrap">
              <Link to="https://www.facebook.com/VUniBox">Về chúng tôi</Link>
            </button>
            <button className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm md:text-base whitespace-nowrap">
            {isAuthenticated ? (
              <Link to="createproject">Bắt đầu ngay</Link>
            ) : (
              <Link to="login">Bắt đầu ngay</Link>
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
              Mục Tiêu của chúng tôi
            </h2>
          </div>

          {/* Các box */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 items-stretch">
          {/* Box 1 - VISION */}
          <div className="flex flex-col bg-blue-200 rounded-2xl px-4 md:px-6 py-4 md:py-6 shadow-md w-full md:w-[340px] min-h-[160px] md:h-[190px]">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiEye  className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
              </div>
              <p className="font-bold text-base md:text-lg">TẦM NHÌN</p>
            </div>
            <p className="text-blue-900 text-xs md:text-sm flex-1">
              Tầm nhìn của chúng tôi là xây dựng một nền tảng học thuật toàn diện hỗ trợ sinh viên ở mọi giai đoạn của hành trình học tập.
            </p>
          </div>

          {/* Box 2 - MISSION */}
          <div className="flex flex-col bg-blue-300 rounded-2xl px-4 md:px-6 py-4 md:py-6 shadow-md w-full md:w-[340px] min-h-[160px] md:h-[190px]">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiBookOpen className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
              </div>
              <p className="font-bold text-base md:text-lg">SỨ MỆNH</p>
            </div>
            <p className="text-blue-900 text-xs md:text-sm flex-1">
              Sứ mệnh của chúng tôi là giúp sinh viên đạt kết quả tốt hơn đồng thời giữ vững sự liêm chính học thuật.
            </p>
          </div>

          {/* Box 3 - VALUE */}
          <div className="flex flex-col bg-blue-200 rounded-2xl px-4 md:px-6 py-4 md:py-6 shadow-md w-full md:w-[340px] min-h-[160px] md:h-[190px]">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="bg-gray-100 p-2 rounded-md">
                <IoPricetagOutline  className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
              </div>
              <p className="font-bold text-base md:text-lg">GIÁ TRỊ</p>
            </div>
            <p className="text-blue-900 text-xs md:text-sm flex-1">
              Giá trị của chúng tôi là thúc đẩy sự liêm chính học thuật, bản địa hóa và phát triển sinh viên thông qua Tự động trích dẫn, Tự động lưu trữ và Tự động thành công.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-blue-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
              Tính năng nổi bật của chúng tôi là gì?
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Khả năng lưu trữ tự động đặc biệt ra sao?
            </p>
          </div>

          {/* Grid 3 box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-8 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AiOutlineClockCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
                Tiết kiệm thời gian thao tác
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Hệ thống tự động xác nhận và phân loại tài liệu ngay khi người
                dùng tải lên, giúp giảm thao tác thủ công, tránh bỏ sót tài
                liệu.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-8 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AiOutlineFileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
                Tổ chức tài liệu thông minh
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Tài liệu được lưu vào đúng thư mục theo loại nguồn (PDF,
                Website, Word...), đảm bảo người dùng luôn tìm lại nhanh chóng
                và chính xác.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-8 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AiOutlineUser className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
                Tăng trải nghiệm cá nhân hóa
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Giao diện song ngữ (Anh – Việt) và chức năng lưu theo lệnh cá
                nhân cho phép người dùng kiểm soát tối đa việc lưu – xoá – phân
                loại tài liệu.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
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
  );
}
