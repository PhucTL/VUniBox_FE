import React, { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");

  return (
    <div className="relative bg-gray-100" style={{ minHeight: '150vh' }}>
      {/* Background */}
      <div className="w-full h-full fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex items-center justify-center relative z-1 py-20">
        <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-400 to-blue-200 rounded-[48px] shadow-xl p-8 flex flex-col items-center relative">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-blue-700 hover:text-blue-900 text-xl"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Tabs */}
          <div className="flex justify-center mb-6 w-full">
            <button
              className={`flex-1 py-2 text-center font-semibold text-blue-800 border-b-2 ${
                tab === "login" ? "border-blue-800" : "border-transparent"
              }`}
              onClick={() => setTab("login")}
            >
              Đăng Nhập
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold text-blue-800 border-b-2 ${
                tab === "register" ? "border-blue-800" : "border-transparent"
              }`}
              onClick={() => setTab("register")}
            >
              Đăng Ký
            </button>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-4">
            {tab === "register" && (
              <div className="justify-items-start">
                <label className="block text-blue-900 font-semibold mb-1 ">
                  Tên*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập tên"
                />
              </div>
            )}
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-1">
                Email*
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-full border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập email"
              />
            </div>
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-1">
                Mật Khẩu*
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-full border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
            >
              {tab === "login" ? "Đăng Nhập" : "Đăng Ký"}
            </button>
          </form>

          {/* Google login */}
          <button className="w-full mt-4 py-2 rounded-full border border-blue-400 flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-medium transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.17v2.92h5.24c-.23 1.24-1.4 3.65-5.24 3.65-3.15 0-5.72-2.61-5.72-5.82s2.57-5.82 5.72-5.82c1.8 0 3.01.77 3.7 1.43l2.53-2.47C16.4 3.97 14.54 3 12.18 3 6.97 3 2.82 7.13 2.82 12.01s4.15 9.01 9.36 9.01c5.39 0 8.96-3.79 8.96-9.13 0-.61-.07-1.09-.17-1.79z"
                fill="#4285F4"
              />
            </svg>
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
}
