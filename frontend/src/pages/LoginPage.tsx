import { useState } from "react";
import { apiClient, API_ENDPOINTS } from "../config/api";
// LoginPage.tsx 顶部
import styles from "./LoginPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.users.login, 
        new URLSearchParams({
          username: email,
          password: password,
        }), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("✅ Login Successful");
      
      navigate(from, { replace: true });

    } catch (error) {
      setMessage("❌ Fail to Login");
    }
    
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>SignIn</h1>
        <input
          type="email"
          placeholder="Email/UserName"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleLogin}
        >
          Sign In
        </button>
        {message && (
          <p
            className={
              message.includes("✅") ? styles.messageSuccess : styles.messageError
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );

}
