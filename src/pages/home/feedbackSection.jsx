export default function FeedbackSection() {
  return (
    <div className="bg-gray-50 py-16 bg-[url('/images/feedback.png')] bg-local bg-no-repeat bg-cover">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-gray-800 font-bold text-xl mb-2">Feedback</h3>
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">Feedback của người dùng (...)</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">Tên tài khoản</p>
                <p className="text-sm text-gray-500">Sinh viên</p>
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
            <p className="text-gray-600 mb-6">Feedback của người dùng (...)</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-semibold">Tên người dùng</p>
                <p className="text-sm text-gray-500">Nghiên cứu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
