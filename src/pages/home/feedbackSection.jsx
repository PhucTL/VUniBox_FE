export default function FeedbackSection() {
  return (
    <div className="bg-gray-50 py-16 bg-[url('/images/feedback.jpg')] bg-local bg-no-repeat bg-cover">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-gray-800 font-bold text-xl mb-2">Feedback</h3>
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              “VUniBox giúp mình tiết kiệm rất nhiều thời gian khi làm luận văn. Tính năng AI tự động trích dẫn và phân loại tài liệu cực kỳ tiện lợi, mình không còn phải lo lắng về việc ghi chú nguồn hay thất lạc file nữa.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">Minh Tuấn</p>
                <p className="text-sm text-gray-500">Sinh viên – Đại học Bách Khoa Hà Nội</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-gray-800 font-bold text-xl mb-2">Feedback</h3>
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              “Là giảng viên, tôi đánh giá cao khả năng kiểm tra liêm chính học thuật và lưu trữ tài liệu của VUniBox. Giao diện thân thiện, thao tác nhanh, phù hợp cho cả sinh viên và người hướng dẫn nghiên cứu.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">TS. Nguyễn Thị Lan</p>
                <p className="text-sm text-gray-500">Giảng viên – Đại học Quốc gia Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
