import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarTrek";
import HotelsCrud from "./components/ListeHotels";
import ToursCrud from "./components/ListeTours";
import Contact from "./components/Contact";
import Login from "./components/Login";
import useAuth from './Hooks/useAuth';
import Inbox from "./components/Inbox";

function App() {
  const { login, isLogin, error, setIsLogin } = useAuth();
  const onLogout = () => {
    setIsLogin(false)
    localStorage.setItem("Login", 'false')
  }
  return (
    <Router>
      {isLogin ? (
        <>
          <Navbar onLogout={onLogout} />
          <Routes>
            <Route path="/" element={<div className="p-4 text-center">Welcome to Trek & Tip</div>} />
            <Route path="/hotels" element={<HotelsCrud />} />
            <Route path="/tours" element={<ToursCrud />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inbox" element={<Inbox />} />
          </Routes>
        </>
      ) : (
        <Login isLogin={isLogin} onLogin={login} error={error} />
      )}


    </Router>
  );
}

export default App;
