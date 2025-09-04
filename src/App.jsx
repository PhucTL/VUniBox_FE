import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
import Login from "./pages/Login/login";

function App() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      <main>
        <Login />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
