import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import SimpleChatbot from "./components/SimpleChatbot";
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
      
      {/* Simple Chatbot - Test version */}
      <SimpleChatbot />
    </div>
  );
}

export default App;
