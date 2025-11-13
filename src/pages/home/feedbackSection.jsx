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
            <p className="text-gray-600 mb-6">“Giao diện dễ sử dụng, trải nghiệm 3D mượt và nhiều thông tin bổ ích. Là sinh viên lịch sử, mình rất thích cách Vunibox kể lại các câu chuyện qua hình ảnh trực quan.”</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">Ngọc Anh</p>
                <p className="text-sm text-gray-500">Sinh viên – Trường Đại học Khoa học Xã hội & Nhân văn</p>
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
            <p className="text-gray-600 mb-6">“Dự án Vunibox là ví dụ tiêu biểu cho việc ứng dụng công nghệ vào bảo tồn di sản. Nội dung được chọn lọc kỹ, hình ảnh chất lượng cao, có thể sử dụng trong nghiên cứu.”</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">ThS. Phạm Duy Minh</p>
                <p className="text-sm text-gray-500">Giảng viên – Viện Nghiên cứu Văn hóa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
