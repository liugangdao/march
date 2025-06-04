// src/components/Header.tsx
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        {/* 左侧 LOGO */}
        <div className="logo-box">
          <img src="/fox.png" alt="logo" className="logo" />
          <span className="brand">escapefox</span>
        </div>

        {/* 中间导航栏 */}
        <div className="nav-bar">
          <nav className="nav">
            <a href="#">Our Rooms</a>
            <a href="#">FAQ</a>
            <a href="#" className="active">Booking</a>
            <a href="#">Corporate Events</a>
            <a href="#">Gift Cards</a>
            <a href="#">Contact Us</a>
          </nav>
        </div>

        {/* 右侧按钮 */}
        <div className="auth-buttons">
          <button className="btn signin-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn register-btn" onClick={() => navigate("/register")}>
            Register
          </button>
          
        </div>
      </div>
    </header>
  );
}
