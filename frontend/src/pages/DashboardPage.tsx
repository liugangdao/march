import Card from "../components/Card"

export default function DashboardPage() {
  console.log("✅ Dashboard 渲染成功")

  return (
    <div style={{ padding: "20px" }}>
      <Card
        imageUrl="/fox.png"
        name="Escape Room A"
        rating={4.7}
        description="小狐狸带你逃出谜题。"
      />
    </div>
  )
}
