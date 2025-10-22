import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-[url('/images/AboutusPage2.png')] bg-cover bg-center flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 leading-snug">
          Tự động hóa trích dẫn và lưu trữ học thuật – <br />
          chuẩn mực, chính xác, tối ưu cho nghiên cứu.
        </h1>
        <p className="text-blue-500 mt-4 ">
          Auto cite - Auto store - Auto Succeed
        </p>
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
            Cách sử dụng
          </button>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition">
            {isAuthenticated ? (
              <Link to="/createproject">Bắt đầu ngay</Link>
            ) : (
              <Link to="/login">Bắt đầu ngay</Link>
            )}
          </button>
        </div>
      </section>

      {/* About VUniBox */}
      <section className="w-full bg-blue-50 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-sm text-blue-600 font-semibold mb-2">
            Tài liệu gọn gàng, trích dẫn sẵn sàng
          </h2>
          <h3 className="text-3xl font-bold text-blue-800 mb-6">Về VUniBox</h3>
          <p className="text-gray-700 mb-4">
            VUniBox là nền tảng học thuật tích hợp, hỗ trợ sinh viên và nhà
            nghiên cứu quản lý tài liệu khoa học một cách thông minh và chính
            xác.
          </p>
          <p className="text-gray-700 mb-4">
            Công cụ cho phép người dùng tự động lưu trữ và phân loại tài liệu
            theo định dạng (PDF, URL, Word...), đồng thời gợi ý trích dẫn theo
            chuẩn học thuật phổ biến như APA, MLA, Harvard...
          </p>
          <p className="text-gray-700 mb-4">
            Chúng tôi tin rằng, một hệ thống trích dẫn và lưu trữ thông minh là
            nền tảng vững chắc cho tri thức học thuật bền vững.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition">
              Cách sử dụng
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90">
            {isAuthenticated ? (
              <Link to="/createproject">Bắt đầu ngay</Link>
            ) : (
              <Link to="/login">Bắt đầu ngay</Link>
            )}
          </button>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1">
          <img
            src="/images/AboutusPage.png"
            alt="VUniBox Screenshot"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-blue-50 py-16 px-6 md:px-20">
        <h2 className="text-blue-600 font-semibold">VUniBox</h2>
        <h3 className="text-3xl font-bold text-blue-800 mb-10">
          Tại sao lại chọn chúng tôi?
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-blue-600 text-3xl mb-4">📦</div>
            <h4 className="text-xl font-bold text-blue-800 mb-2">
              Chuẩn học thuật từ gốc
            </h4>
            <p className="text-gray-700">
              Cam kết tuân thủ các tiêu chuẩn trích dẫn quốc tế (APA, MLA,
              Harvard...) và đảm bảo tính chính xác tuyệt đối trong quá trình
              lưu trữ – phân loại – trích dẫn tài liệu.
            </p>
          </div>
          <div>
            <div className="text-blue-600 text-3xl mb-4">📦</div>
            <h4 className="text-xl font-bold text-blue-800 mb-2">
              Lưu trữ thông minh – truy xuất dễ dàng
            </h4>
            <p className="text-gray-700">
              Hệ thống phân loại tài liệu dựa trên cấu trúc folder mẹ – folder
              con, cho phép lọc tự động theo định dạng và loại nguồn khi tải
              lên.
            </p>
          </div>
          <div>
            <div className="text-blue-600 text-3xl mb-4">📦</div>
            <h4 className="text-xl font-bold text-blue-800 mb-2">
              Tự động hóa quy trình nghiên cứu
            </h4>
            <p className="text-gray-700">
              VUniBox giúp tiết kiệm thời gian với hệ thống tự động lưu trữ và
              tổ chức tài liệu thông minh, hỗ trợ đa định dạng và loại nguồn học
              thuật.
            </p>
          </div>
        </div>
        {/* Bottom Buttons */}
        <div className="flex w-full justify-center gap-6 mt-16">
          <button className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition">
            Cách sử dụng
          </button>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition">
            {isAuthenticated ? (
              <Link to="/createproject">Bắt đầu ngay</Link>
            ) : (
              <Link to="/login">Bắt đầu ngay</Link>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
