// src/pages/ThemeDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ThemeDetailPage.css"; 
interface Slot {
  id: number;
  date: string;
  time: string;
  max_people: number;
}

interface Theme {
  id: number;
  image_url: string;
  title: string;
  rating: number;
  description: string;
  slots: Slot[];
}

interface User {
  name: string;
  email: string;
}

export default function ThemeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/themes/${id}`);
        const data = await res.json();
        setTheme(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch theme");
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [id]);

  const fetchUser = async (): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/tokenget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return null;

      const data = await res.json();
      console.log("🧾 User info from backend:", data);
      return data;
    } catch (err) {
      console.error("Failed to fetch user", err);
      return null;
    }
  };

  const handleBooking = async (slot_id: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const currentUser = await fetchUser();
    if (!currentUser) {
      alert("Invalid or expired login. Please log in again.");
      navigate("/login");
      return;
    }

    setUser(currentUser);

    try {
      const res = await fetch("http://localhost:8000/api/participation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: currentUser.name,
          email: currentUser.email,
          slot_id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Booking failed. Please try again later.");
        return;
      }

      const data = await res.json();
      console.log("✅ Booking successful:", data);
      alert("Booking successful!");
    } catch (err) {
      console.error("Request failed:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>🎯 Loading...</div>;
  if (error || !theme)
    return <div style={{ padding: "20px", color: "red" }}>❌ Failed to load theme</div>;

  return (
    <div className="theme-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <h1>{theme.title}</h1>
      <img src={theme.image_url} alt={theme.title} className="theme-image" />
      <p className="theme-rating">⭐ Rating: {theme.rating} / 5</p>
      <p className="theme-description">{theme.description}</p>

      <h3 className="slots-title">📅 Available Time Slots</h3>
      {theme.slots.length === 0 ? (
        <p className="no-slots">No available time slots</p>
      ) : (
        <ul className="slot-list">
          {theme.slots.map((slot) => (
            <li key={slot.id} className="slot-item">
              <span>
                <strong>{slot.date}</strong> - {slot.time} (Max People: {slot.max_people})
              </span>
              <button className="book-button" onClick={() => handleBooking(slot.id)}>Book</button>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
}
