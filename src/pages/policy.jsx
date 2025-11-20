import { FaFilePdf } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen w-full">
      {/* Banner */}
      <div className="relative mx-auto px-4 py-20 md:py-32 mt-16 md:mt-10 min-h-[350px] md:min-h-[500px] bg-[url('/images/Policy.jpg')] bg-center bg-no-repeat bg-cover flex items-center justify-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-2xl text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-3 md:mb-4 font-semibold tracking-wide drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">VUniBox privacy policy 2025 </p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-6 justify-items-center">
        <ul className="space-y-4 md:space-y-6">
          <li className="flex items-center gap-2 text-base md:text-lg font-semibold text-blue-800 cursor-pointer hover:underline">
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
        <div className="mt-8 md:mt-10 flex justify-center">
          <button className="flex items-center gap-2 px-5 md:px-6 py-2 md:py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90 shadow-md text-sm md:text-base">
            <FaFilePdf className="text-lg md:text-xl" />
            Download PDF version
          </button>
        </div>
      </div>
    </div>
  );
}
