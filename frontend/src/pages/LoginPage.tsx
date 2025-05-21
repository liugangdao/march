import { useState } from "react";
import axios from "axios";
// LoginPage.tsx 顶部
import styles from "./LoginPage.module.css";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login", 
        new URLSearchParams({
          username: email,
          password: password,
        }), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("✅ 登录成功");
    } catch (error) {
      setMessage("❌ 登录失败");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>登录</h1>
        <input
          type="email"
          placeholder="邮箱"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleLogin}
        >
          登录
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
