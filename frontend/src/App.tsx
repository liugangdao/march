import { Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import Layout from "./pages/Layout"
import ThemeDetailPage from "./pages/ThemeDetailPage"
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage"
function App() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path ="/admin" element ={<AdminPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/themes/:id" element={<ThemeDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
