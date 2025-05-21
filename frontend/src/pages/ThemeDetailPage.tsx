import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Theme {
  id: number;
  image_url: string;
  title: string;
  rating: number;
  description: string;
}

export default function ThemeDetailPage() {
  const { id } = useParams();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    console.log("theme id from URL:", id);
    fetch(`http://127.0.0.1:8000/api/themes/${id}`)
      .then(res => res.json())
      .then(data => setTheme(data))
      .catch(err => console.error("Failed to fetch theme detail", err));
  }, [id]);

  if (!theme) return <div>加载中...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{theme.title}</h1>
      <img src={theme.image_url} alt={theme.title} style={{ maxWidth: "300px" }} />
      <p>评分: {theme.rating} / 5</p>
      <p>{theme.description}</p>
    </div>
  );
}
