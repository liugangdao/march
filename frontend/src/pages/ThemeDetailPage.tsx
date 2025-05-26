import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function ThemeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/themes/${id}`);
        if (!res.ok) throw new Error("获取失败");
        const data = await res.json();
        setTheme(data);
      } catch (err: any) {
        console.error(err);
        setError("获取失败");
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [id]);

  if (loading) return <div style={{ padding: "20px" }}>🎯 加载中...</div>;
  if (error || !theme) return <div style={{ padding: "20px", color: "red" }}>❌ 加载失败</div>;
  const handleRegister = async()=>{
    const token = localStorage.getItem("token");
    if(!token){
      alert("Please login before your booking");
      return;
    }
    fetch("http://127.0.0.1:8000/api/users/tokenget",{
      headers: {
        Authorization: `Bearer ${token}`,
    },
  })
    .then(res=>{
      if (!res.ok) throw new Error("获取用户信息失败");
        return res.json();
    })
      .then(data => {
        console.log("用户信息获取成功:", data);
        setUser(data)
      })
      .catch(() => navigate("/login"));
    }
  const handleBooking =async()=>{
    handleRegister();

  }
  return (


    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← 返回
      </button>

      <h1>{theme.title}</h1>
      <img src={theme.image_url} alt={theme.title} style={{ maxWidth: "100%", marginBottom: "12px" }} />
      <p>⭐ 评分：{theme.rating} / 5</p>
      <p style={{ marginBottom: "20px" }}>{theme.description}</p>

      <h3>📅 可预约时间段</h3>
      {theme.slots.length === 0 ? (
        <p>暂无可预约时间</p>
      ) : (
        <ul>
          {theme.slots.map(slot => (
            <li key={slot.id} style={{ marginBottom: "10px" }}>
              <strong>{slot.date}</strong> - {slot.time}（最多人数：{slot.max_people}）
              <button onClick={handleBooking} style={{ marginBottom: "20px" }}>
           Booking
      </button>

            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}
