import { FaFilePdf } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen w-full">
      {/* Banner */}
      <div className="relative bg-cover  h-100 flex items-center px-10 bg-[url('/images/Policy.png')] ">
        <div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mt-10">
            Privacy Policy
          </h1>
          <p className="text-gray-700 mt-5">VUniBox privacy policy “ 2025</p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="max-w-3xl mx-auto py-12 px-6 justify-items-center">
        <ul className="space-y-6">
          <li className="flex items-center gap-2 text-lg font-semibold text-blue-800 cursor-pointer hover:underline">
            <span className="text-xl">›</span> Terms of Use
          </li>
          <li className="flex items-center gap-2 text-lg font-semibold text-blue-800 cursor-pointer hover:underline">
            <span className="text-xl">›</span> Privacy Policy
          </li>
          <li className="flex items-center gap-2 text-lg font-semibold text-blue-800 cursor-pointer hover:underline">
            <span className="text-xl">›</span> Document Storage Policy
          </li>
          <li className="flex items-center gap-2 text-lg font-semibold text-blue-800 cursor-pointer hover:underline">
            <span className="text-xl">›</span> User Rights and Responsibilities
          </li>
        </ul>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90 shadow-md">
            <FaFilePdf className="text-xl" />
            Download PDF version
          </button>
        </div>
      </div>
    </div>
  );
}
