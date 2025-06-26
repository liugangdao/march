import { Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import Layout from "./pages/Layout"
import ThemeDetailPage from "./pages/ThemeDetailPage"
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage"
import OurRoom from "./pages/OurRoom"
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/ourRoom" element={<OurRoom />} />
          <Route path="/themes/:id" element={<ThemeDetailPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
