import React, { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");

  return (
    <div className="relative bg-gray-100" style={{ minHeight: "100vh" }}>
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
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-400 to-blue-200 rounded-[48px] shadow-xl p-12 flex flex-col items-center relative mt-50">
          {/* Tabs */}
          <div className="flex justify-center mb-8 w-[400px]">
            <button
              className={`flex-1 py-3 text-center text-lg font-semibold text-blue-800 border-b-2 ${
                tab === "login" ? "border-blue-800" : "border-transparent"
              }`}
              onClick={() => setTab("login")}
            >
              Đăng Nhập
            </button>
            <button
              className={`flex-1 py-3 text-center text-lg font-semibold text-blue-800 border-b-2 ${
                tab === "register" ? "border-blue-800" : "border-transparent"
              }`}
              onClick={() => setTab("register")}
            >
              Đăng Ký
            </button>
          </div>

          {/* Form */}
          <form className="w-[400px] flex flex-col gap-6">
            {tab === "register" && (
              <div className="justify-items-start">
                <label className="block text-blue-900 font-semibold mb-2 text-lg">
                  Tên*
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập tên"
                />
              </div>
            )}
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Email*
              </label>
              <input
                type="email"
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập email"
              />
            </div>
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Mật Khẩu*
              </label>
              <input
                type="password"
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition"
            >
              {tab === "login" ? "Đăng Nhập" : "Đăng Ký"}
            </button>
          </form>

          {/* Google login */}
          <button className="w-[400px] mt-6 py-3 rounded-full border-2 border-blue-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-blue-700 font-medium text-lg transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
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
