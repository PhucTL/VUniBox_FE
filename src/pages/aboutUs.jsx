import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function VideoSection({ onClose, scrollTo }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (scrollTo && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollTo]);
  return (
    <section ref={sectionRef} className="w-full flex justify-center py-8 bg-white">
      <div className="bg-white rounded-2xl shadow-lg p-4 mt-10 max-w-8xl w-full flex flex-row items-start gap-8">
        {/* Left: Hướng dẫn sử dụng */}
        <div className="flex-1 text-left rounded-2xl shadow-3xl bg-blue-50 ">
          <div className="ml-5 mt-5">
          <h2 className="text-lg font-bold mb-4 text-blue-600">Bảng hướng dẫn sử dụng VUniBox</h2>
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <span className="font-semibold">Bước 1: Upload tài liệu</span>
              <ul className="list-disc pl-5 text-gray-700 mt-1">
                <li>Quét hoặc tải file (PDF, DOCX, hình ảnh…) lên VUniBox.</li>
                <li>Hệ thống của VUniBox sẽ tự động phân tích nội dung và nhận diện thông tin trích dẫn.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Bước 2: Lưu tài liệu</span>
              <ul className="list-disc pl-5 text-gray-700 mt-1">
                <li>Sau khi phân tích, hệ thống của VUniBox hiển thị tùy chọn <b>Lưu</b> hoặc <b>Không lưu</b>.</li>
                <li>Chọn <b>Lưu</b> để đưa tài liệu vào thư mục mặc định.</li>
                <li>Chọn <b>Không lưu</b> để chuyển vào thùng tạm trong 10 ngày.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Bước 3: Chọn kiểu trích dẫn</span>
              <ul className="list-disc pl-5 text-gray-700 mt-1">
                <li>Trong thư mục mặc định, chọn chuẩn trích dẫn bạn muốn sử dụng (APA 7th, MLA, IEEE, Chicago…).</li>
                <li>Hệ thống của VUniBox sẽ tự động tạo trích dẫn dựa trên thông tin nhận diện từ tài liệu và hiển thị citation đã được định dạng sẵn.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Bước 4: Copy trích dẫn</span>
              <ul className="list-disc pl-5 text-gray-700 mt-1">
                <li>Nhấn <b>Copy</b> để sao chép trích dẫn đã định dạng.</li>
                <li>Dán trực tiếp vào Word, Google Docs, slide hoặc tài liệu bạn đang làm việc.</li>
              </ul>
            </li>
          </ol>
          <div className="mt-6 text-gray-700">
            <span className="font-semibold">Sau khi hoàn tất</span>
            <ul className="list-disc pl-5 mt-1">
              <li>Nếu bạn muốn chỉnh sửa thông tin trích dẫn, hãy truy cập mục “Đã lưu” hoặc “Tất cả” để cập nhật lại citation.</li>
            </ul>
          </div>
          </div>
        </div>
        {/* Right: Video */}
        <div className="flex-1 flex flex-col items-center mt-5">
          <h2 className="text-lg font-bold mb-4 text-blue-600">Video hướng dẫn</h2>
          <iframe
            src="https://drive.google.com/file/d/1ZSkCmH41NUfj-JTJo7UJwZvCs4EgKIrH/preview"
            width="100%"
            height="400"
            allow="autoplay"
            className="rounded-xl border"
            title="VUniBox Video Hướng dẫn"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [showVideoHero, setShowVideoHero] = useState(false);
  const [showVideoAbout, setShowVideoAbout] = useState(false);
  const [showVideoWhy, setShowVideoWhy] = useState(false);
  const [scrollToHero, setScrollToHero] = useState(false);
  const [scrollToAbout, setScrollToAbout] = useState(false);
  const [scrollToWhy, setScrollToWhy] = useState(false);
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-[url('/images/AboutusPage2.png')] bg-cover bg-center flex flex-col justify-center items-center text-center px-6">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50"></div>
        
        {/* Content */}
        <div className="relative  max-w-5xl">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
            Tự động hóa trích dẫn và lưu trữ học thuật <br />
            chuẩn mực, chính xác, tối ưu cho nghiên cứu.
          </h1>
          <p className="text-xl text-white font-semibold mb-10 drop-shadow-lg tracking-wide">
            Auto cite - Auto store - Auto Succeed
          </p>
          <div className="flex gap-4 justify-center flex-col items-center">
            <div className="flex gap-4">
              <button
                className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
                onClick={() => {
                  setShowVideoHero(!showVideoHero);
                  setTimeout(() => setScrollToHero(!showVideoHero), 100);
                }}
              >
                Cách sử dụng
              </button>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {isAuthenticated ? (
                  <Link to="/createproject">Bắt đầu ngay</Link>
                ) : (
                  <Link to="/login">Bắt đầu ngay</Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      {showVideoHero && <VideoSection onClose={() => setShowVideoHero(false)} scrollTo={scrollToHero} />}

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
          <div className="flex gap-4 justify-start flex-col items-start">
            <div className="flex gap-4">
              <button
                className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition"
                onClick={() => {
                  setShowVideoAbout(!showVideoAbout);
                  setTimeout(() => setScrollToAbout(!showVideoAbout), 100);
                }}
              >
                Cách sử dụng
              </button>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {isAuthenticated ? (
                  <Link to="/createproject">Bắt đầu ngay</Link>
                ) : (
                  <Link to="/login">Bắt đầu ngay</Link>
                )}
              </button>
            </div>
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
      {showVideoAbout && <VideoSection onClose={() => setShowVideoAbout(false)} scrollTo={scrollToAbout} />}

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
        <div className="flex gap-4 justify-center flex-col items-center mt-10">
            <div className="flex gap-4">
              <button
                className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition"
                onClick={() => {
                  setShowVideoWhy(!showVideoWhy);
                  setTimeout(() => setScrollToWhy(!showVideoWhy), 100);
                }}
              >
                Cách sử dụng
              </button>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {isAuthenticated ? (
                  <Link to="/createproject">Bắt đầu ngay</Link>
                ) : (
                  <Link to="/login">Bắt đầu ngay</Link>
                )}
              </button>
            </div>
          </div>
      </section>
      {showVideoWhy && <VideoSection onClose={() => setShowVideoWhy(false)} scrollTo={scrollToWhy} />}
    </div>
  );
}
