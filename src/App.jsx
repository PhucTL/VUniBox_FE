import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import CitationChatbot from "./components/CitationChatbot";
import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Citation Chatbot - Available on all pages */}
      <React.Suspense fallback={null}>
        <CitationChatbot />
      </React.Suspense>
    </div>
  );
}

export default App;
