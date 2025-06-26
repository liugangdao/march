import { useState } from "react";
import { apiClient, API_ENDPOINTS } from "../config/api";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    if (!validatePassword()) return;
    setLoading(true);
    try {
      const response = await apiClient.post(API_ENDPOINTS.users.register, {
        name,
        email,
        password,
      });
      setMessage("✅ Registration successful! User ID: " + response.data.id);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data?.detail) {
        setMessage("❌ Registration failed: " + error.response.data.detail);
      } else {
        setMessage("❌ Registration failed. Please check if the server is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const isValidLength = password.length >= 10;

    if (!isValidLength || !hasLetter) {
      setPasswordError("Password must be at least 10 characters and contain letters.");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Registration</h1>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password (at least 10 characters with letters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
        />

        {passwordError && (
          <p className={styles.messageError}>{passwordError}</p>
        )}

        <button
          onClick={handleRegister}
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
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
