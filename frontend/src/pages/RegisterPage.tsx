import { useState } from "react";
import axios from "axios";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";




export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", {
        name,
        email,
      });
      setMessage("✅ 注册成功，用户ID：" + response.data.id);
      setName("");
      setEmail("");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setMessage("❌ 注册失败：" + error.response.data.detail);
      } else {
        setMessage("❌ 注册失败，请检查服务器是否开启！");
      }
    } finally {
      setLoading(false);   // ✅ 无论成功失败，都要关掉 loading
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>用户注册</h1>
        <input
          type="text"
          placeholder="用户名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <button
          onClick={handleRegister}
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "注册中..." : "注册"}
        </button>
        {message && (
          <p
            className={
              message.includes("✅")
                ? styles.messageSuccess
                : styles.messageError
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
