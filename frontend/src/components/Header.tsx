// src/components/Header.tsx
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
       



        <div className="nav-bar">
          <div className="logo-box">
            <img src="/fox.png" alt="logo" className="logo" />
          <span className="brand">escapefox</span>
        </div>
          <nav className="nav">
            <NavLink to="/ourRoom" className={({ isActive }) => isActive ? "active" : ""}>
              Our Rooms
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => isActive ? "active" : ""}>
              FAQ
            </NavLink>
            <NavLink to="/booking" className={({ isActive }) => isActive ? "active" : ""}>
              Booking
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => isActive ? "active" : ""}>
              Corporate Events
            </NavLink>
            <NavLink to="/gift" className={({ isActive }) => isActive ? "active" : ""}>
              Gift Cards
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
              Contact Us
            </NavLink>
          </nav>
          <div className="auth-buttons">
            <button className="btn signin-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="btn register-btn" onClick={() => navigate("/register")}>
              Register
            </button>
            
          </div>
        </div>

    

      </div>
    </header>
  );
}
