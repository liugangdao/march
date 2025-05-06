import Card from "../components/Card"
import React, { useEffect, useState } from "react";

interface Theme {
  id: number;
  image_url: string;
  title: string;
  rating: number;
  description: string;
}
export default function DashboardPage() {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/themes")
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
      })
      .catch((err) => console.error("Failed to fetch themes", err));
  }, []);
  // DashboardPage.tsx
  return (
    <div className="dashboard">
      <Section title="精选景点" data={scenicData} />
      <Section title="美食推荐" data={foodData} />
      <Section title="周边城市" data={cityData} />
      <Section title="超值特卖" data={promoData} />
    </div>
  );

}
