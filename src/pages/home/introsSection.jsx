import { FiBookOpen, FiPlus, FiLayers, FiDatabase } from "react-icons/fi";
import {
  AiOutlineClockCircle,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";
export default function IntroSection() {
  return (
    <div className="bg-white">
      {/* Section 1 */}
      <div className="flex flex-row  mx-auto px-4 py-16 mt-10 h-100 bg-[url('/images/image.jpg')] bg-local bg-no-repeat bg-cover">
        <div className="text-start justify-items-start mt-40  ">
          <p className="text-sm text-blue-600 mb-2">
            Tài liệu gọn gàng, trích dẫn sẵn sàng
          </p>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">VUniBox</h1>
          <p className="text-blue-600">
            Nâng tầm nghiên cứu với nền tảng lưu trữ và trích dẫn toàn diện.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full">
              Về chúng tôi
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
              <Link to="demo">Bắt đầu ngay</Link>
              
            </button>
          </div>
        </div>
 
      </div>

      {/* Section 2 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Mục Tiêu của chúng tôi
            </h2>
            <p className="text-gray-600">
              Tự động lưu và phân loại tài liệu theo nguồn, hỗ trợ trích dẫn
              nhanh - chuẩn - chính xác.
            </p>
          </div>

          {/* Các box */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Box 1 */}
            <div className="flex items-center gap-3 bg-blue-200 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiBookOpen className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+10</p>
                <p className="text-blue-900">Cách trích dẫn</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex items-center gap-3 bg-blue-300 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiPlus className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+10</p>
                <p className="text-blue-900">Nguồn trích dẫn uy tín</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-center gap-3 bg-blue-200 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiLayers className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+2</p>
                <p className="text-blue-900">Tự động phân loại tài liệu</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="flex items-center gap-3 bg-blue-400 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiDatabase className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+2GB</p>
                <p className="text-blue-900">Bộ nhớ lưu trữ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Tính năng nổi bật của chúng tôi là gì?
            </h2>
            <p className="text-gray-600">
              Khả năng lưu trữ tự động đặc biệt ra sao?
            </p>
          </div>

          {/* Grid 3 box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineClockCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tiết kiệm thời gian thao tác
              </h3>
              <p className="text-gray-600">
                Hệ thống tự động xác nhận và phân loại tài liệu ngay khi người
                dùng tải lên, giúp giảm thao tác thủ công, tránh bỏ sót tài
                liệu.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineFileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tổ chức tài liệu thông minh
              </h3>
              <p className="text-gray-600">
                Tài liệu được lưu vào đúng thư mục theo loại nguồn (PDF,
                Website, Word...), đảm bảo người dùng luôn tìm lại nhanh chóng
                và chính xác.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineUser className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tăng trải nghiệm cá nhân hóa
              </h3>
              <p className="text-gray-600">
                Giao diện song ngữ (Anh – Việt) và chức năng lưu theo lệnh cá
                nhân cho phép người dùng kiểm soát tối đa việc lưu – xoá – phân
                loại tài liệu.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50">
              Về chúng tôi
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90">
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
