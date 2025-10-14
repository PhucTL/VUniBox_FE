import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import VUniBoxChatbot from "./components/VUniBoxChatbot";
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
      
      {/* VUniBox Chatbot - Updated version */}
      <VUniBoxChatbot />
    </div>
  );
}

export default App;
