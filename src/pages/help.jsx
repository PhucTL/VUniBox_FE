import { Link } from "react-router-dom";

export default function HelpCenter() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center  mt-20">
      {/* Help Options với background */}
      <div className="w-full bg-[url('/images/Help.jpg')] bg-no-repeat bg-cover flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-10 text-center">
          Help Center
        </h1>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-blue-800">Support</h2>
            <p className="text-gray-600 text-sm">Get assistance with issues</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-blue-800">Documentations</h2>
            <p className="text-gray-600 text-sm">Browse help articles</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <Link to="https://www.facebook.com/VUniBox">
            <h2 className="text-lg font-bold text-blue-800">Contact Us</h2>
            <p className="text-gray-600 text-sm">Reach out</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex w-full justify-center gap-6 mt-12 mb-10">
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition">
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLScN1zi3edgSS2rg5nSFGql-_TdCKa4dBk4jEBwPGqChCDf-7g/viewform?usp=sharing&ouid=112926310380479204670">
          Feedback
          </Link>
        </button>
      </div>
    </div>
  );
}
