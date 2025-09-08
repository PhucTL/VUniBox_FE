import React from "react";

export default function Account() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 mt-20">
      {/* Profile Section */}
      <div className="flex items-start gap-8 mb-12">
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=150&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button className="mt-4 text-blue-600 hover:underline">
            Tải ảnh lên
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-600">Your Name</h1>
              <p className="text-gray-600">User@example.com</p>
            </div>
            <button className="px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
              Đổi Tài Khoản
            </button>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Trạng thái: Free
            </span>
            <button className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700">
              Nâng cấp ngay
            </button>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Tài Khoản</h2>
        <div className="text-gray-600 mb-4">Thông tin tài khoản</div>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Họ và tên</div>
              <div className="text-gray-600">Name Surname</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>

          {/* Package */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Gói đang sử dụng</div>
              <div className="text-gray-600">Free</div>
            </div>
            <button className="text-blue-600 hover:underline">Upgrade</button>
          </div>

          {/* Usage Info */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Thông tin sử dụng</div>
              <div className="text-gray-600">
                Storage capacity: 400MB
                <br />
                Files have saved: 20
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Email</div>
              <div className="text-gray-600">email@example.com</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Mật khẩu</div>
              <div className="text-gray-600">*******</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Ngôn ngữ</div>
              <div className="text-gray-600">Tiếng Việt</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
          Feedback
        </button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
          Help Center
        </button>
      </div>
    </div>
  );
}
